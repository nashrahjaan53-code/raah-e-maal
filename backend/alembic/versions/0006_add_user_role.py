"""add role column to users table

Revision ID: 0006_add_user_role
Revises: 0005_add_loan_fields
Create Date: 2026-04-17 00:00:00
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0006_add_user_role"
down_revision = "0005_add_loan_fields"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add role column to users table with default value 'user'
    op.add_column('users', sa.Column('role', sa.String(), nullable=False, server_default='user'))


def downgrade() -> None:
    # Remove role column
    op.drop_column('users', 'role')
