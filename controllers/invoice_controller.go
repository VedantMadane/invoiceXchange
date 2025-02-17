package controllers

import (
	"net/http"
	"invoiceXchange/config"
	"invoiceXchange/models"

	"github.com/gin-gonic/gin"
)

type InvoiceController struct{}

// CreateInvoice handles creating a new invoice record
func (ic *InvoiceController) CreateInvoice(c *gin.Context) {
	var invoice models.Invoice
	if err := c.ShouldBindJSON(&invoice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := config.DB.Create(&invoice).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, invoice)
}

// ListInvoices returns all invoices
func (ic *InvoiceController) ListInvoices(c *gin.Context) {
	var invoices []models.Invoice
	if err := config.DB.Find(&invoices).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, invoices)
}
