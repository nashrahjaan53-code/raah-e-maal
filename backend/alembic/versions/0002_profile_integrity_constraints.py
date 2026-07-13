"""add profile integrity constraints

Revision ID: 0002_profile_integrity_constraints
Revises: 0001_initial_schema
Create Date: 2026-03-29 00:00:00
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0002_profile_integrity_constraints"
down_revision = "0001_initial_schema"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Keep one profile per user before adding a unique constraint.
    op.execute(
        """
        DELETE FROM financial_profiles
        WHERE user_id IS NOT NULL
          AND id NOT IN (
            SELECT MIN(id)
            FROM financial_profiles
            WHERE user_id IS NOT NULL
            GROUP BY user_id
          )
        """
    )

    with op.batch_alter_table("financial_profiles", schema=None) as batch_op:
        batch_op.create_index("ix_financial_profiles_user_id", ["user_id"], unique=False)
        batch_op.create_unique_constraint("uq_financial_profiles_user_id", ["user_id"])
        batch_op.create_foreign_key(
            "fk_financial_profiles_user_id_users",
            "users",
            ["user_id"],
            ["id"],
            ondelete="CASCADE",
        )

    with op.batch_alter_table("loans", schema=None) as batch_op:
        batch_op.create_index("ix_loans_user_id", ["user_id"], unique=False)


def downgrade() -> None:
    with op.batch_alter_table("loans", schema=None) as batch_op:
        batch_op.drop_index("ix_loans_user_id")

    with op.batch_alter_table("financial_profiles", schema=None) as batch_op:
        batch_op.drop_constraint("fk_financial_profiles_user_id_users", type_="foreignkey")
        batch_op.drop_constraint("uq_financial_profiles_user_id", type_="unique")
        batch_op.drop_index("ix_financial_profiles_user_id")
