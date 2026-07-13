"""add missing loan fields for tenure and calculations

Revision ID: 0005_add_loan_fields
Revises: 0004_add_recommendations_and_simulations
Create Date: 2026-04-01 00:00:00
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0005_add_loan_fields"
down_revision = "0004_add_recommendations_and_simulations"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add missing columns to loans table
    op.add_column('loans', sa.Column('tenure_months', sa.Integer(), nullable=True))
    op.add_column('loans', sa.Column('total_payment', sa.Float(), nullable=True))
    op.add_column('loans', sa.Column('total_interest', sa.Float(), nullable=True))
    op.add_column('loans', sa.Column('application_date', sa.DateTime(), nullable=True))
    op.add_column('loans', sa.Column('approval_date', sa.DateTime(), nullable=True))
    op.add_column('loans', sa.Column('risk_score', sa.Float(), nullable=True))


def downgrade() -> None:
    # Remove added columns
    op.drop_column('loans', 'risk_score')
    op.drop_column('loans', 'approval_date')
    op.drop_column('loans', 'application_date')
    op.drop_column('loans', 'total_interest')
    op.drop_column('loans', 'total_payment')
    op.drop_column('loans', 'tenure_months')
