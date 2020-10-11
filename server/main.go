package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"github.com/leyka/Presence/server/database"
	"github.com/leyka/Presence/server/router"
)

// Environment types
const (
	Development = iota
	Production
)

// Configuration structure
type Config struct {
	Port         string
	DBConnection string
	Env          uint
}

func main() {
	e := echo.New()

	// Config
	c := new(Config)
	c.Init()

	// Database
	database.Init(c.DBConnection)
	database.Migrate()

	// Middlewares
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "[${method}] uri=${uri}, status=${status}, ip=${remote_ip}, time=${time_rfc3339_nano}, error=${error}\n",
	}))

	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.Use(middleware.RequestID())

	if c.Env == Production {
		e.Use(middleware.Secure())
		e.Use(middleware.Gzip())
	}

	// Router
	router.Init(e, database.DBConn)

	// Start server
	port := fmt.Sprintf(":%s", c.Port)
	e.Logger.Fatal(e.Start(port))
}

// Read .env file and injects it to server memory
func (c *Config) Init() {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	// Port
	c.Port = "5000"
	port, exists := os.LookupEnv("PORT")
	if exists {
		c.Port = port
	}

	// Database URL
	connection, exists := os.LookupEnv("DB_CONN")
	if exists {
		c.DBConnection = connection
	} else {
		panic("DB_CONN key has not been defined in .env file")
	}

	// Environment : default is Production
	c.Env = Production
	env, exists := os.LookupEnv("ENV")
	if exists && env == "development" {
		c.Env = Development
	}
}
