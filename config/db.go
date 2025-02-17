package config

import (
	"log"
	"invoiceXchange/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var err error
	DB, err = gorm.Open(sqlite.Open("invoice_discounting.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database: ", err)
	}
	// Auto migrate models: User, Invoice, Discount
	DB.AutoMigrate(&models.User{}, &models.Invoice{}, &models.Discount{})
}
