package sisubot;

public class HttpEvent {

    private String body;

    public void setBody(String body) {
        this.body = body;
    }

    public String getBody() {
        return body;
    }

    public String toString() {
        return String.format("HttpEvent[body: %s]", this.body);
    }
}