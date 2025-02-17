package controllers

import (
	"net/http"
	"invoiceXchange/config"
	"invoiceXchange/models"

	"github.com/gin-gonic/gin"
)

type ReportController struct{}

// DashboardReport generates a simple report
func (rc *ReportController) DashboardReport(c *gin.Context) {
	var totalInvoices int64
	config.DB.Model(&models.Invoice{}).Count(&totalInvoices)
	report := gin.H{
		"total_invoices": totalInvoices,
		"message":        "Report generated successfully",
	}
	c.JSON(http.StatusOK, report)
}
