package models

import "time"

type Invoice struct {
	ID          uint      `gorm:"primaryKey"`
	VendorID    uint      `json:"vendor_id"`    // refers to the vendor user ID
	PurchaserID uint      `json:"purchaser_id"` // refers to the purchaser user ID
	Amount      float64   `json:"amount"`
	Status      string    `json:"status"` // e.g., "pending", "approved", "paid"
	CreatedAt   time.Time `json:"created_at"`
}
