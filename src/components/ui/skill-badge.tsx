import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React from "react";

interface SkillBadgeProps {
  skill: {
    name: string;
    icon: React.ReactNode;
  };
  index: number;
}

export function SkillBadge({ skill, index }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Badge variant="secondary" className="flex items-center gap-2">
        {skill.icon}
        <span>{skill.name}</span>
      </Badge>
    </motion.div>
  );
}