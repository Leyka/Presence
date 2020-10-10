package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/leyka/Presence/server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DBConn *gorm.DB

type Config struct {
	Port  string
	DBUrl string
}

func main() {
	e := echo.New()

	// Middlewares
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Config
	c := new(Config)
	c.initConfig()

	// Database
	initDatabase(c.DBUrl)
	migrateDatabase()

	// Routes
	e.GET("/", hello)

	// Start server
	port := fmt.Sprintf(":%s", c.Port)
	e.Logger.Fatal(e.Start(port))
}

// Read .env file and injects it to server memory
func (c *Config) initConfig() {
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
	db, exists := os.LookupEnv("DB_URL")
	if exists {
		c.DBUrl = db
	} else {
		panic("DB_URL key has not been defined in .env file")
	}
}

func initDatabase(dbUrl string) {
	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	DBConn = db
}

func migrateDatabase() {
	err := DBConn.AutoMigrate(&models.Teacher{})
	if err != nil {
		panic(err)
	}
}

// Handler
func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}
