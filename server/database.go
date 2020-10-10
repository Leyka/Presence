package main

import (
	"github.com/leyka/Presence/server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DBConn *gorm.DB

func InitDatabase(connection string) {
	db, err := gorm.Open(postgres.Open(connection), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	DBConn = db
}

func MigrateDatabase() {
	err := DBConn.AutoMigrate(&models.Teacher{}, &models.Classroom{}, &models.Student{})
	if err != nil {
		panic(err)
	}
}
