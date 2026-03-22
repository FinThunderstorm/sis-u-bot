(ns sisubot
  (:gen-class
   :methods [^:static [handler [String] String]])
  (:require [clojure.pprint :refer [pprint]])
  (:require [clojure.data.json :as json]))

(defn generate-courses-answer []
  (str """Based on your previous completed courses, I suggest you take following course:
           |Course                                    |Course code|Credits|
           |------------------------------------------|-----------|-------|
           |Digital Transformation Management         |YY00BW98   |5      |
  """)
  )

(defn generate-where-answer []
  (str """You can find your student number from `My profile > Personal information`
  """)
  )


(defn generate-evaluated-answer []
  (str """You have got following evaluations in last 30 days:
          |Course                                    |Course code|Credits|Grade|
          |------------------------------------------|-----------|-------|-----|
          |Software Engineering Models and Modeling  |CT60A5103  |6      |5    |
          |Foundations of Software Product Management|CT70A6201  |6      |4    |
          |Requirements Engineering                  |CT70A2000  |6      |5    |
          """)
  )

(defn generate-unknown-answer []
  (str """I did not understand your question, please rephrase and try again.
  """)
  )

(defn generate-answer [question]
  (if (re-find #"courses" question) (generate-courses-answer) (
        if (re-find #"where" question) (generate-where-answer) (
           if (re-find #"evaluated" question) (generate-evaluated-answer) (generate-unknown-answer)
             ))
    )
  )

(defn -handler [this event]
  (pprint event)
  (json/write-str {:answer (generate-answer (.getBody event))})
  )

(gen-class
  :name Sisubot
  :methods [[handler [sisubot.HttpEvent] String]])