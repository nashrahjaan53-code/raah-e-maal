"""enforce not null user link columns

Revision ID: 0003_enforce_not_null_user_links
Revises: 0002_profile_integrity_constraints
Create Date: 2026-03-29 00:30:00
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0003_enforce_not_null_user_links"
down_revision = "0002_profile_integrity_constraints"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Remove orphan or incomplete records before enforcing NOT NULL constraints.
    op.execute("DELETE FROM loans WHERE user_id IS NULL")
    op.execute("DELETE FROM financial_profiles WHERE user_id IS NULL")
    op.execute("DELETE FROM users WHERE username IS NULL OR hashed_password IS NULL")

    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.alter_column("username", existing_type=sa.String(), nullable=False)
        batch_op.alter_column("hashed_password", existing_type=sa.String(), nullable=False)

    with op.batch_alter_table("loans", schema=None) as batch_op:
        batch_op.alter_column("user_id", existing_type=sa.Integer(), nullable=False)

    with op.batch_alter_table("financial_profiles", schema=None) as batch_op:
        batch_op.alter_column("user_id", existing_type=sa.Integer(), nullable=False)


def downgrade() -> None:
    with op.batch_alter_table("financial_profiles", schema=None) as batch_op:
        batch_op.alter_column("user_id", existing_type=sa.Integer(), nullable=True)

    with op.batch_alter_table("loans", schema=None) as batch_op:
        batch_op.alter_column("user_id", existing_type=sa.Integer(), nullable=True)

    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.alter_column("hashed_password", existing_type=sa.String(), nullable=True)
        batch_op.alter_column("username", existing_type=sa.String(), nullable=True)
