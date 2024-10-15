import {
  Command,
  Loader2Icon,
  Moon,
  Sparkles,
  SunMedium,
  User,
} from "lucide-react"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  logo: Command,
  sun: SunMedium,
  moon: Moon,
  user: User,
  spinner: Loader2Icon,
  sparkles: Sparkles,
}

export const Icons: IconsType = icons
