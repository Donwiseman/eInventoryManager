"""This defines the Organization class and it's mappingss to the DB"""
from . import Base
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import uuid


class Organization(Base):
    """Defines the organization class"""
    __tablename__ = "organizations"
    id = Column(String(60), primary_key=True)
    name = Column(String(128), nullable=False)
    country = Column(String(128), nullable=False)
    address = Column(String(128))
    creator_id = Column(String(128), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    description = Column(String(128))
    time_zone = Column(String(128), nullable=False)
    mobile = Column(String(60))
    image = Column(String(512))
    creator = relationship("User", back_populates='org_created')
    user_associations = relationship("OrgUserAssociation",
                                     back_populates="organization")
    categories = relationship("Category", back_populates="organization")
    items = relationship("Item", back_populates="organization")
    purchases = relationship("Purchase", back_populates="organization")
    sales = relationship("Sale", back_populates="organization")

    def __init__(self, **kwargs):
        """Initializes the class"""
        self.id = str(uuid.uuid4())
        self.name = kwargs.get("name", None)
        self.country = kwargs.get("country", None)
        self.address = kwargs.get("address", None)
        self.creator_id = kwargs.get("user_id", None)
        self.description = kwargs.get("description", None)
        self.time_zone = kwargs.get("timezone", None)
        self.mobile = kwargs.get("mobile", None)
        self.image = kwargs.get("image", None)

    def create_item(self, **kwargs):
        """Adds an item to the inventory"""
        from .items import Item
        from database import storage
        from .purchases import Purchase
        kwargs["organization_id"] = self.id
        new_item = Item(**kwargs)
        storage.add(new_item)
        trans = {
            "date": datetime.utcnow(),
            "user_name": kwargs.get("user_name"),
            "organization_id": self.id,
            "item_id": new_item.id,
            "details": kwargs.get("description", None),
            "quantity": kwargs.get("quantity"),
            "total_cost": kwargs.get("total_cost", 0),
            "new_item_total": kwargs.get("quantity")
        }
        new_purchase = Purchase(**trans)
        storage.add(new_purchase)
        storage.save()
        return new_item

    def set_all_alert_level(self, alert_level: int):
        """Set an laert level for all item"""
        from database import storage
        for item in self.items:
            item.alert_level = alert_level
        storage.save()

    def add_category(self, name: str, description: str = None):
        """Adds a category to the organization inventory"""
        from .categories import Category
        from database import storage
        cat = {
            "organization_id": self.id,
            "name": name,
            "description": description
        }
        category = Category(**cat)
        storage.add(category)
        storage.save()
        return category

    def get_user_role(self, user_id):
        """Gets the role of a given user within the organization"""
        for asso in self.user_associations:
            if asso.user_id == user_id:
                return asso.user_role
        return "Not a user within this organization"
