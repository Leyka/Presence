package config

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
	Secret       string
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
		panic("'DB_CONN' key has not been defined in .env file")
	}

	// Secret key
	secret, exists := os.LookupEnv("SECRET")
	if exists {
		c.Secret = secret
	} else {
		panic("'SECRET' key has not been defined in .env file")
	}

	// Environment : default is Production
	c.Env = Production
	env, exists := os.LookupEnv("ENV")
	if exists && env == "development" {
		c.Env = Development
	}
}
