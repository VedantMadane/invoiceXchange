package services

import (
	"io/ioutil"
	"net/http"
)

// GetExternalData demonstrates integration with a third-party API.
func GetExternalData() (string, error) {
	resp, err := http.Get("https://api.example.com/data")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}
