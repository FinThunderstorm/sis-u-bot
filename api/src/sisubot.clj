(ns sisubot
  (:gen-class
    :methods [^:static [handler [String] String]])
  (:require [clojure.pprint :refer [pprint]])
  (:require [clojure.data.json :as json]))

(defn map-answer-body [answer, success]
  (json/write-str {:answer answer :success success}))

(defn generate-courses-answer []
  (str "" "Based on your previous completed courses, I suggest you take following course:

|Course                                       |Credits|
|---------------------------------------------|-------|
|Digital Transformation Management - YY00BW98 |5      |
"
       ""))

(defn generate-where-answer []
  (str "You can find your student number from `My profile > Personal information`"))


(defn generate-evaluated-answer []
  (str "" "You have got following evaluations in last 30 days:

|Course                                                 |Credits|Grade|
|-------------------------------------------------------|-------|-----|
|Software Engineering Models and Modeling - CT60A5103   |6      |5    |
|Foundations of Software Product Management - CT70A6201 |6      |4    |
|Requirements Engineering - CT70A2000                   |6      |5    |
"
       ""))

(defn generate-unknown-answer []
  (str "I did not understand your question, please rephrase your question and try again."))

(defn generate-answer [question]
  (if (re-find #"slow" question) (Thread/sleep 2000))
  (if (re-find #"courses" question)
    (map-answer-body (generate-courses-answer) true)
    (if (re-find #"where" question)
      (map-answer-body (generate-where-answer) true)
      (if (re-find #"evaluated" question)
        (map-answer-body (generate-evaluated-answer) true)
        (map-answer-body (generate-unknown-answer) false)))))


(defn -handler [this event]
  (pprint event)
  (generate-answer (.getBody event)))

(gen-class
 :name    Sisubot
 :methods [[handler [sisubot.HttpEvent] String]])