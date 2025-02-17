package main

import (
	"invoiceXchange/config"
	"invoiceXchange/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Gin router
	r := gin.Default()

	// Connect to the database (using GORM)
	config.InitDB()

	// Setup all application routes
	routes.SetupRoutes(r)

	// Start server on port 5000
	r.Run(":5000")
}
