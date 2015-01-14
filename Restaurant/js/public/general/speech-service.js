"use strict"

define(function (require) {
    var app = require("app")
    var speechService = ["$q", function ($q) {
        return {
            getVoices: function () {
                var deferred = $q.defer()
                var voices = speechSynthesis.getVoices()
                if (voices.length === 0) {
                    var intervalId = setInterval(function () {
                        voices = speechSynthesis.getVoices()
                        if (voices.length !== 0) {
                            clearInterval(intervalId)
                            deferred.resolve(voices)
                        }
                    }, 0)
                } else {
                    deferred.resolve(voices)
                }
                return deferred.promise
            },
            createMsg: function (msg) {
                return new SpeechSynthesisUtterance(msg)
            },
            getNativeVoice: function () {
                return this.getVoices().then(function (voices) {
                    var nativeVoice
                    voices.some(function (voice) {
                        if (voice.name === "native" || voice.localService === true) {
                            nativeVoice = voice
                            return true
                        }
                    })
                    return nativeVoice
                })
            },
            speak: function (msg) {
                if (!msg.voice) {
                    this.getNativeVoice().then(function (nativeVoice) {
                        msg.voice = nativeVoice
                        console.log("voice:", nativeVoice)
                        speechSynthesis.speak(msg)
                        msg.onstart = function () {
                            console.log("speech:start", msg)
                        }
                        msg.onend = function () {
                            console.log("speech:end", msg)
                        }
                    })
                }
            }
        }
    }]
    app.service("speechService", speechService)

})