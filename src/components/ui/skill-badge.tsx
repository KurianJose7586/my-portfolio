import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface SkillBadgeProps {
  skill: {
    name: string;
    icon: string;
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
        <img src={skill.icon} alt={skill.name} className="h-4 w-4" />
        <span>{skill.name}</span>
      </Badge>
    </motion.div>
  );
}