package controllers

import (
	"net/http"
	"invoiceXchange/config"
	"invoiceXchange/models"

	"github.com/gin-gonic/gin"
)

type DiscountController struct{}

// ApplyDiscount applies a discount to an invoice
func (dc *DiscountController) ApplyDiscount(c *gin.Context) {
	// Expected JSON: { "invoiceID": 1, "userID": 1, "discountValue": 10.0 }
	var req struct {
		InvoiceID     uint    `json:"invoiceID"`
		UserID        uint    `json:"userID"`
		DiscountValue float64 `json:"discountValue"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	discount := models.Discount{
		InvoiceID: req.InvoiceID,
		UserID:    req.UserID,
		Value:     req.DiscountValue,
	}
	if err := config.DB.Create(&discount).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, discount)
}
