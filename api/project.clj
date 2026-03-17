(defproject sis-u-bot-api "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.12.4"]
                 [org.clojure/data.json "2.5.2"]
                 [com.amazonaws/aws-lambda-java-core "1.4.0"]]
  :java-source-paths ["src/java"]
  :aot :all)