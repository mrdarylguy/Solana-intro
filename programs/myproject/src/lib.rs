use anchor_lang::prelude::*;

declare_id!("GsL7VedhpmqitZnfzPgi6D7QZhC2xVQ2DEVZQYhHYUiH");

#[program]
pub mod myproject {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let initial_account = &mut ctx.accounts.initial_account;
        initial_account.value = 10;
        Ok(())
    }

    pub fn update_value(ctx: Context<UpdateValue>, value: u64) -> Result<()> {
        let storage_account = &mut ctx.accounts.storage_account;
        storage_account.value = value;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer=user, space=500)]
    pub initial_account: Account<'info, Init>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateValue<'info> {
    #[account(mut)]
    pub storage_account: Account<'info, Init>,
}

#[account]
pub struct Init {
    value: u64,
}
