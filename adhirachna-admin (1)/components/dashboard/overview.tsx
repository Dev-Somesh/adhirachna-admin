"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    blog: 4,
    projects: 2,
  },
  {
    name: "Feb",
    blog: 3,
    projects: 1,
  },
  {
    name: "Mar",
    blog: 5,
    projects: 3,
  },
  {
    name: "Apr",
    blog: 2,
    projects: 0,
  },
  {
    name: "May",
    blog: 6,
    projects: 2,
  },
  {
    name: "Jun",
    blog: 4,
    projects: 1,
  },
  {
    name: "Jul",
    blog: 3,
    projects: 2,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="blog" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="projects" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
