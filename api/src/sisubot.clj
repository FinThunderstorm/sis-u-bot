(ns sisubot
  (:gen-class
   :methods [^:static [handler [String] String]])
  (:require [clojure.pprint :refer [pprint]]))

(defn identify-question [question]
  (if (re-find #"courses" question) "courses" (
        if (re-find #"where" question) "where" (
           if (re-find #"evaluated" question) "evaluated" "unknown"
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