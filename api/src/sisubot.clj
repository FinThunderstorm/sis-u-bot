(ns sisubot
  (:gen-class
   :methods [^:static [handler [String] String]])
  (:require [clojure.pprint :refer [pprint]]))

(defn identify-question [question]
  (if (re-find #"courses" question) """Based on your previous completed courses, I suggest you take following course:
           |Course                                    |Course code|Credits|
           |------------------------------------------|-----------|-------|
           |Digital Transformation Management         |YY00BW98   |5      |
  """ (
        if (re-find #"where" question) "You can find your student number from `My profile > Personal information`" (
           if (re-find #"evaluated" question) """
           You have got following evaluations in last 30 days:
           |Course                                    |Course code|Credits|Grade|
           |------------------------------------------|-----------|-------|-----|
           |Software Engineering Models and Modeling  |CT60A5103  |6      |5    |
           |Foundations of Software Product Management|CT70A6201  |6      |4    |
           |Requirements Engineering                  |CT70A2000  |6      |5    |
           """ "I did not understand your question, please rephrase and try again."
             ))
    )
  )

(defn -handler [this event]
  (pprint event)
  (identify-question (.getBody event))
  )

(gen-class
  :name Sisubot
  :methods [[handler [sisubot.HttpEvent] String]])