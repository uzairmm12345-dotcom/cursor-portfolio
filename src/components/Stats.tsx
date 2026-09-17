'use client'
import CountUp from "react-countup"
import { useInView } from 'react-intersection-observer'
import { motion } from "framer-motion"

const stats = [
  { num: 3, suffix: "+", text: "Years of Experience" },
  { num: 5, suffix: "+", text: "Projects Built" },
  { num: 12, suffix: "+", text: "Technologies" },
  { num: 2, suffix: "", text: "AI Agents Built" },
]

const Stats = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 xl:p-5 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {inView && (
              <div className="font-display text-2xl xl:text-3xl font-bold text-accent mb-1">
                <CountUp end={item.num} duration={2} delay={index * 0.08} />
                <span>{item.suffix}</span>
              </div>
            )}
            <p className="text-xs xl:text-sm text-white/50">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Stats
