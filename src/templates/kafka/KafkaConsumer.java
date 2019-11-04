package <%= props.packageKafka %>;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KafkaConsumer {

	@KafkaListener(topics = "<%= props.kafkaTopic %>", groupId = "<%= props.kafkaGroupId %>")
	public void consume(String message) {
		log.info(String.format("$$ -> Consumed Message -> %s", message));
	}

}