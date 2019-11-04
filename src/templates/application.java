package <%= props.groupId %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"<%= props.groupId %>"})
public class <%= props.appName %> {

	public static void main(String[] args) {
		SpringApplication.run(<%= props.appName %>.class, args);
	}
}