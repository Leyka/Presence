package controllers

import (
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/config"
	"github.com/leyka/Presence/server/models"
	"gorm.io/gorm"
)

type Auth struct {
	Config *config.Config
	DB     *gorm.DB
}

type response struct {
	Teacher models.Teacher `json:"teacher"`
	Token   string         `json:"token"`
}

type JwtTeacherClaims struct {
	*models.Teacher
	jwt.StandardClaims
}

func NewAuthController(c *config.Config, db *gorm.DB) *Auth {
	return &Auth{
		Config: c,
		DB:     db,
	}
}

func (a *Auth) Login(c echo.Context) (err error) {
	var payload models.Teacher
	if err = c.Bind(&payload); err != nil {
		c.Logger().Error(err)
		return c.JSON(http.StatusNotAcceptable, err)
	}

	var teacher models.Teacher
	// Check username
	err = a.DB.Where("username = ?", payload.Username).First(&teacher).Error
	if err != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusNotFound)
	}

	// Check password
	if !teacher.IsMatchingPassword(payload.Password) {
		c.Logger().Error("Password doesn't match")
		return c.NoContent(http.StatusNotFound)
	}
	// Okay!
	r := &response{
		Teacher: *teacher.Sanitize(),
		Token:   a.createJwtToken(&teacher),
	}

	return c.JSON(http.StatusOK, r)
}

func (a *Auth) Register(c echo.Context) (err error) {
	var teacher models.Teacher
	if err = c.Bind(&teacher); err != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusNotAcceptable)
	}

	// Save in DB
	if a.DB.Create(&teacher).Error != nil {
		c.Logger().Error(err)
		return c.NoContent(http.StatusInternalServerError)
	}

	r := &response{
		Teacher: *teacher.Sanitize(),
		Token:   a.createJwtToken(&teacher),
	}

	return c.JSON(http.StatusOK, r)
}

func (a *Auth) createJwtToken(t *models.Teacher) string {
	claims := &JwtTeacherClaims{
		t,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 30).Unix(), // Month
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	secretBytes := []byte(a.Config.Secret)
	encodedToken, err := token.SignedString(secretBytes)
	if err != nil {
		panic(err)
	}

	return encodedToken
}
