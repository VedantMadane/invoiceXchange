package models

import "time"

type Discount struct {
	ID        uint      `gorm:"primaryKey"`
	UserID    uint      `json:"user_id"`
	InvoiceID uint      `json:"invoice_id"`
	Value     float64   `json:"value"` // discount applied
	CreatedAt time.Time `json:"created_at"`
}
