package main

import (
	"fmt"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/database"
	"github.com/leyka/Presence/server/router"
)

func main() {
	e := echo.New()

	// Config
	c := new(config.Config)
	c.Init()

	// Database
	database.Init(c.DBConnection)
	database.Migrate()

	// Middlewares
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "[${method}] uri=${uri}, status=${status}, ip=${remote_ip}, time=${time_rfc3339_nano}, error=${error}\n",
	}))
	e.Use(middleware.Recover())

	// test
	e.Use(middleware.RequestID())
	e.Use(middleware.CSRFWithConfig(middleware.CSRFConfig{
		CookieHTTPOnly: true,
		CookiePath:     "/api",
	}))

	if c.Env == config.Production {
		e.Use(middleware.Secure())
		e.Use(middleware.Gzip())
		e.Use(middleware.CORS()) // TODO: check if CORS still needed later?
	}

	// Router
	router.Init(e, c, database.DBConn)

	// Start server
	port := fmt.Sprintf(":%s", c.Port)
	e.Logger.Fatal(e.Start(port))
}
