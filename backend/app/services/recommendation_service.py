from sqlalchemy.orm import Session

from app.models.recommendation_model import Recommendation


def create_recommendation(
	db: Session,
	user_id: int,
	title: str,
	analysis: dict,
	notes: str | None = None,
) -> Recommendation:
	recommendation = Recommendation(
		user_id=user_id,
		title=title,
		analysis=analysis,
		notes=notes,
	)
	db.add(recommendation)
	db.commit()
	db.refresh(recommendation)
	return recommendation


def get_recommendation_by_id(db: Session, recommendation_id: int) -> Recommendation | None:
	return (
		db.query(Recommendation)
		.filter(Recommendation.id == recommendation_id)
		.first()
	)


def get_recommendations_by_user(db: Session, user_id: int) -> list[Recommendation]:
	return (
		db.query(Recommendation)
		.filter(Recommendation.user_id == user_id)
		.order_by(Recommendation.id.desc())
		.all()
	)


def update_recommendation(
	db: Session,
	recommendation_id: int,
	title: str | None = None,
	analysis: dict | None = None,
	notes: str | None = None,
) -> Recommendation | None:
	recommendation = get_recommendation_by_id(db, recommendation_id)
	if not recommendation:
		return None

	if title is not None:
		recommendation.title = title
	if analysis is not None:
		recommendation.analysis = analysis
	if notes is not None:
		recommendation.notes = notes

	db.commit()
	db.refresh(recommendation)
	return recommendation


def delete_recommendation(db: Session, recommendation_id: int) -> bool:
	recommendation = get_recommendation_by_id(db, recommendation_id)
	if not recommendation:
		return False

	db.delete(recommendation)
	db.commit()
	return True
