// Supabase Edge Function — Kafka Consumer
// Called on a schedule (every 5 seconds via pg_cron or Supabase cron).
// Reads messages from Upstash Kafka and applies them to employees_mirror.

import { serve }        from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const KAFKA_REST_URL      = Deno.env.get('UPSTASH_KAFKA_REST_URL')!
const KAFKA_REST_USERNAME = Deno.env.get('UPSTASH_KAFKA_REST_USERNAME')!
const KAFKA_REST_PASSWORD = Deno.env.get('UPSTASH_KAFKA_REST_PASSWORD')!
const TOPIC               = 'employee-changes'
const CONSUMER_GROUP      = 'mirror-consumer-group'
const CONSUMER_NAME       = 'mirror-consumer-1'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async () => {
  try {
    const credentials = btoa(`${KAFKA_REST_USERNAME}:${KAFKA_REST_PASSWORD}`)

    // Fetch up to 10 messages from Kafka
    const res = await fetch(
      `${KAFKA_REST_URL}/consume/${CONSUMER_GROUP}/${CONSUMER_NAME}/${TOPIC}?timeout=1000&count=10`,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type':  'application/json',
        },
      }
    )

    if (!res.ok) {
      const err = await res.text()
      console.error('Kafka consume failed:', err)
      return new Response(JSON.stringify({ error: err }), { status: 500 })
    }

    const messages = await res.json()

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), { status: 200 })
    }

    let processed = 0

    for (const msg of messages) {
      const event = JSON.parse(msg.value)
      const { type, record, old_record } = event

      if (type === 'INSERT') {
        await supabase.from('employees_mirror').insert({
          id:             record.id,
          full_name:      record.full_name,
          employee_id:    record.employee_id,
          role:           record.role,
          department:     record.department,
          date_of_joining: record.date_of_joining,
          created_at:     record.created_at,
          synced_at:      new Date().toISOString(),
        })
      } else if (type === 'UPDATE') {
        await supabase.from('employees_mirror').upsert({
          id:             record.id,
          full_name:      record.full_name,
          employee_id:    record.employee_id,
          role:           record.role,
          department:     record.department,
          date_of_joining: record.date_of_joining,
          created_at:     record.created_at,
          synced_at:      new Date().toISOString(),
        })
      } else if (type === 'DELETE') {
        await supabase.from('employees_mirror').delete().eq('id', old_record.id)
      }

      processed++
      console.log(`Applied ${type} to employees_mirror for id:`, record?.id ?? old_record?.id)
    }

    return new Response(JSON.stringify({ processed }), { status: 200 })

  } catch (e) {
    console.error('Consumer error:', e)
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 })
  }
})
