"""initial schema

Revision ID: 0001_initial_schema
Revises: 
Create Date: 2026-03-26 00:00:00
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0001_initial_schema"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(), nullable=True),
        sa.Column("hashed_password", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_users_id"), "users", ["id"], unique=False)
    op.create_index(op.f("ix_users_username"), "users", ["username"], unique=True)

    op.create_table(
        "financial_profiles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("income", sa.Float(), nullable=True),
        sa.Column("expenses", sa.Float(), nullable=True),
        sa.Column("savings", sa.Float(), nullable=True),
        sa.Column("credit_score", sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_financial_profiles_id"), "financial_profiles", ["id"], unique=False)

    op.create_table(
        "loans",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("loan_name", sa.String(), nullable=True),
        sa.Column("amount", sa.Float(), nullable=True),
        sa.Column("emi", sa.Float(), nullable=True),
        sa.Column("interest_rate", sa.Float(), nullable=True),
        sa.Column("status", sa.String(), nullable=True),
        sa.Column("approved_by", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_loans_id"), "loans", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_loans_id"), table_name="loans")
    op.drop_table("loans")

    op.drop_index(op.f("ix_financial_profiles_id"), table_name="financial_profiles")
    op.drop_table("financial_profiles")

    op.drop_index(op.f("ix_users_username"), table_name="users")
    op.drop_index(op.f("ix_users_id"), table_name="users")
    op.drop_table("users")
