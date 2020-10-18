package helpers

import (
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/leyka/Presence/server/models"
)

type JwtUserClaims struct {
	Id uint
	jwt.StandardClaims
}

// Create a new Json Web Token of user (user)
func CreateJwt(u *models.User, secret string) string {
	claims := &JwtUserClaims{
		u.ID,
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

// Returns User object from JWT provided in request
func GetUserFromJwt(c *echo.Context) *JwtUserClaims {
	userToken := (*c).Get("user").(*jwt.Token)
	claims := userToken.Claims.(*JwtUserClaims)
	return claims
}
