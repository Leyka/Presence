package main

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	// Config
	config := new(Config)
	config.Init()

	// Database
	InitDatabase(config.DBUrl)
	MigrateDatabase()

	// Middlewares
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	if config.Env == Production {
		e.Use(middleware.Gzip())
	}

	// Routes
	e.GET("/", hello)

	// Start server
	port := fmt.Sprintf(":%s", config.Port)
	e.Logger.Fatal(e.Start(port))
}

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
