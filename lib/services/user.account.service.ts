import { ACCOUNT_ACCESS, PrismaClient } from '@prisma/client';
import { UtilService } from './util.service';

const TRIAL_PLAN_NAME = '3 Month Trial'; // TODO - some sort of config... this will change for every use of the saas

export default class UserAccountService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getUserBySupabaseId(supabase_uid: string) {
    return this.prisma.user.findFirst({ where: { supabase_uid }, include: { memberships: true } });
  }

  async getUserById(user_id: number) {
    return this.prisma.user.findFirstOrThrow({ where: { id: user_id }, include: { memberships: true } });
  }

  async createUser(supabase_uid: string, display_name: string) {
    const trialPlan = await this.prisma.plan.findFirstOrThrow({ where: { name: TRIAL_PLAN_NAME } });
    return this.prisma.user.create({
      data: {
        supabase_uid: supabase_uid,
        display_name: display_name,
        memberships: {
          create: {
            account: {
              create: {
                plan_id: trialPlan.id,
                name: display_name,
                features: trialPlan.features, // copy in features from the plan, plan_id is a loose association and settings can change independently
                current_period_ends: UtilService.addMonths(new Date(), 3),
                max_notes: trialPlan.max_notes,
              }
            },
            access: ACCOUNT_ACCESS.OWNER
          }
        }
      },
      include: { memberships: true },
    });
  }

  async deleteUser(user_id: number) {
    return this.prisma.user.delete({ where: { id: user_id } });
  }

  async joinUserToAccount(user_id: number, account_id: number) {
    return this.prisma.membership.create({
      data: {
        user_id: user_id,
        account_id: account_id
      }
    });
  }

  async changeAccountPlan(account_id: number, plan_id: number) {
    const plan = await this.prisma.plan.findFirstOrThrow({ where: { id: plan_id } });
    return this.prisma.account.update({
      where: { id: account_id },
      data: {
        plan_id: plan_id,
        features: plan.features,
        max_notes: plan.max_notes,
      }
    });
  }


  // Claim ownership of an account.
  // User must already be an ADMIN for the Account
  // Existing OWNER memberships are downgraded to ADMIN
  // In future, some sort of Billing/Stripe tie in here e.g. changing email details on the Account, not sure.
  async claimOwnershipOfAccount(user_id: number, account_id: number) {
    const membership = await this.prisma.membership.findUniqueOrThrow({
      where: {
        user_id_account_id: {
          user_id: user_id,
          account_id: account_id,
        }
      },
    });

    if (membership.access === ACCOUNT_ACCESS.OWNER) {
      return; // already owner
    } else if (membership.access !== ACCOUNT_ACCESS.ADMIN) {
      throw new Error('UNAUTHORIZED: only Admins can claim ownership');
    }

    const existing_owner_memberships = await this.prisma.membership.findMany({
      where: {
        account_id: account_id,
        access: ACCOUNT_ACCESS.OWNER,
      },
    });

    for (const existing_owner_membership of existing_owner_memberships) {
      await this.prisma.membership.update({
        where: {
          user_id_account_id: {
            user_id: existing_owner_membership.user_id,
            account_id: account_id,
          }
        },
        data: {
          access: ACCOUNT_ACCESS.ADMIN, // Downgrade OWNER to ADMIN
        }
      });
    }

    // Finally upddate the ADMIN member to OWNER
    return this.prisma.membership.update({
      where: {
        user_id_account_id: {
          user_id: user_id,
          account_id: account_id,
        }
      },
      data: {
        access: ACCOUNT_ACCESS.OWNER,
      }
    });
  }

  // Upgrade access of a membership. Cannot use this method to upgrade to or downgrade from OWNER access
  async changeUserAccessWithinAccount(user_id: number, account_id: number, access: ACCOUNT_ACCESS) {
    if (access === ACCOUNT_ACCESS.OWNER) {
      throw new Error('UNABLE TO UPDATE MEMBERSHIP: use claimOwnershipOfAccount method to change ownership');
    }

    const membership = await this.prisma.membership.findUniqueOrThrow({
      where: {
        user_id_account_id: {
          user_id: user_id,
          account_id: account_id,
        }
      },
    });

    if (membership.access === ACCOUNT_ACCESS.OWNER) {
      throw new Error('UNABLE TO UPDATE MEMBERSHIP: use claimOwnershipOfAccount method to change ownership');
    }

    return this.prisma.membership.update({
      where: {
        user_id_account_id: {
          user_id: user_id,
          account_id: account_id,
        }
      },
      data: {
        access: access,
      }
    });
  }
}