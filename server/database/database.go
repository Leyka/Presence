package database

import (
	"github.com/leyka/Presence/server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DBConn *gorm.DB

func Init(connection string) {
	db, err := gorm.Open(postgres.Open(connection), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	DBConn = db
}

func Migrate() {
	err := DBConn.AutoMigrate(&models.School{}, &models.User{}, &models.Classroom{}, &models.Schedule{}, &models.Student{})
	if err != nil {
		panic(err)
	}
}
