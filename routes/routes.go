package routes

import (
	"invoiceXchange/controllers"
	"invoiceXchange/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	authController := new(controllers.AuthController)
	invoiceController := new(controllers.InvoiceController)
	discountController := new(controllers.DiscountController)
	reportController := new(controllers.ReportController)

	// Public authentication routes
	r.POST("/auth/register", authController.Register)
	r.POST("/auth/login", authController.Login)

	// Protected API group using JWT middleware
	api := r.Group("/api")
	api.Use(middleware.JWTAuthMiddleware())

	// Invoice management endpoints
	api.POST("/invoice", invoiceController.CreateInvoice)
	api.GET("/invoices", invoiceController.ListInvoices)

	// Discount endpoint
	api.POST("/discount/apply", discountController.ApplyDiscount)

	// Reporting endpoint
	api.GET("/report/dashboard", reportController.DashboardReport)

	// Additional role-based endpoints can be achieved by combining JWT and RoleMiddleware,
	// for example: api.GET("/admin/dashboard", middleware.RoleMiddleware("admin"), adminController.Dashboard)
}
