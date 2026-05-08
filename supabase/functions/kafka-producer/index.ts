// Supabase Edge Function — Kafka Producer
// Triggered by a Supabase Database Webhook on the employees table.
// Publishes the change event to Upstash Kafka.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const KAFKA_REST_URL      = Deno.env.get('UPSTASH_KAFKA_REST_URL')!
const KAFKA_REST_USERNAME = Deno.env.get('UPSTASH_KAFKA_REST_USERNAME')!
const KAFKA_REST_PASSWORD = Deno.env.get('UPSTASH_KAFKA_REST_PASSWORD')!
const TOPIC               = 'employee-changes'

serve(async (req) => {
  try {
    const payload = await req.json()

    // payload from Supabase webhook: { type, table, record, old_record }
    const message = {
      type:       payload.type,        // INSERT | UPDATE | DELETE
      record:     payload.record,      // new row data
      old_record: payload.old_record,  // previous row data (UPDATE/DELETE)
      timestamp:  new Date().toISOString(),
    }

    const credentials = btoa(`${KAFKA_REST_USERNAME}:${KAFKA_REST_PASSWORD}`)

    const res = await fetch(`${KAFKA_REST_URL}/produce/${TOPIC}`, {
      method:  'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({ value: JSON.stringify(message) }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Kafka produce failed:', err)
      return new Response(JSON.stringify({ error: err }), { status: 500 })
    }

    console.log(`Published ${message.type} event for employee:`, message.record?.id)
    return new Response(JSON.stringify({ ok: true }), { status: 200 })

  } catch (e) {
    console.error('Producer error:', e)
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
})
