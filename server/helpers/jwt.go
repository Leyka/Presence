package helpers

import (
	"errors"
	"net/http"
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
			ExpiresAt: time.Now().Add(time.Hour * 24 * 15).Unix(),
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
func GetUserFromJwt(c *echo.Context) (*JwtUserClaims, error) {
	user := (*c).Get("user")
	if user == nil {
		return nil, errors.New("No Json Web Token (JWT) found")
	}

	token := user.(*jwt.Token)
	claims := token.Claims.(*JwtUserClaims)
	return claims, nil
}

func CreateJwtCookie(c *echo.Context, token string) {
	(*c).SetCookie(&http.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(24 * time.Hour * 15),
		HttpOnly: true,
	})
}
