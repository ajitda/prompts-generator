import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ToolCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    badge?: string;
    gradient: 'primary' | 'accent';
}

const ToolCard = ({
    title,
    description,
    icon: Icon,
    href,
    badge,
    gradient,
}: ToolCardProps) => {
    return (
        <div className="group relative rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
            {/* Badge */}
            {badge && (
                <div className="absolute -top-3 left-6 z-10">
                    <span
                        className={`rounded-full px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase ${
                            gradient === 'primary'
                                ? 'bg-gradient'
                                : 'bg-gradient-accent'
                        }`}
                    >
                        {badge}
                    </span>
                </div>
            )}

            {/* Icon */}
            <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                    gradient === 'primary'
                        ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                        : 'bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white dark:text-indigo-400'
                }`}
            >
                <Icon className="h-7 w-7" />
            </div>

            {/* Content */}
            <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
                {title}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                {description}
            </p>

            {/* CTA */}
            <Link href={href}>
                <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm font-semibold transition-colors group-hover:text-primary hover:bg-transparent"
                >
                    Try it now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
    );
};

export default ToolCard;
