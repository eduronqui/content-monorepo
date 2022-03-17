import { Kafka } from 'kafkajs'

export function KafkaClient({ clientId, brokers }: { clientId: string; brokers: string[] }) {
  const kafka = new Kafka({ clientId, brokers })

  return kafka
}
