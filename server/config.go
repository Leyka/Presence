package main

import (
	"os"

	"github.com/joho/godotenv"
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
		panic("DB_URL key has not been defined in .env file")
	}

	// Environment : default is Production
	c.Env = Production
	env, exists := os.LookupEnv("ENV")
	if exists && env == "development" {
		c.Env = Development
	}
}
