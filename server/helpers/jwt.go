package helpers

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/models"
)

type JwtTeacherClaims struct {
	Id uint
	jwt.StandardClaims
}

// Create a new Json Web Token of teacher (user)
func CreateJwt(t *models.Teacher, secret string) string {
	claims := &JwtTeacherClaims{
		t.ID,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24 * 30).Unix(), // Month
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	encodedToken, err := token.SignedString([]byte(secret))
	if err != nil {
		panic(err)
	}

	return encodedToken
}

// Returns Teacher object from JWT provided in request
func GetTeacherFromJwt(c *echo.Context) *JwtTeacherClaims {
	userToken := (*c).Get("user").(*jwt.Token)
	claims := userToken.Claims.(*JwtTeacherClaims)
	return claims
}
