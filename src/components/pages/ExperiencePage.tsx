'use client';

import Image from 'next/image';
import { BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { ExperienceItem, ExperiencePageConfig } from '@/types/page';

function ExperienceIcon({ kind }: { kind?: ExperienceItem['kind'] }) {
    const Icon = kind === 'work' ? BriefcaseBusiness : GraduationCap;

    return (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
            <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
    );
}

function ExperienceImage({ item }: { item: ExperienceItem }) {
    if (!item.image) {
        return null;
    }

    if (item.imageMode === 'crop-left') {
        return (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white dark:border-neutral-800">
                <div className="absolute inset-y-0 left-0 w-[200%]">
                    <Image
                        src={item.image}
                        alt={item.imageAlt || item.organization}
                        fill
                        sizes="160px"
                        className="object-contain object-left"
                    />
                </div>
            </div>
        );
    }

    const isWordmark = item.imageMode === 'wordmark';

    return (
        <div className={`relative h-20 shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-white dark:border-neutral-800 ${isWordmark ? 'w-full sm:w-44' : 'w-20'}`}>
            <Image
                src={item.image}
                alt={item.imageAlt || item.organization}
                fill
                sizes={isWordmark ? '176px' : '80px'}
                className={isWordmark ? 'scale-[2.15] object-contain' : 'p-1.5 object-contain'}
            />
        </div>
    );
}

export default function ExperiencePage({ config }: { config: ExperiencePageConfig }) {
    let itemIndex = 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <header className="mb-12 max-w-2xl">
                {config.eyebrow && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                        {config.eyebrow}
                    </p>
                )}
                <h1 className="mb-4 font-serif text-4xl font-bold text-primary">{config.title}</h1>
                {config.description && (
                    <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {config.description}
                    </p>
                )}
            </header>

            <div className="space-y-12">
                {config.sections.map((section) => (
                    <section key={section.title} aria-labelledby={`experience-${section.title}`}>
                        <div className="mb-5 flex items-center gap-4">
                            <h2
                                id={`experience-${section.title}`}
                                className="shrink-0 font-serif text-2xl font-bold text-primary"
                            >
                                {section.title}
                            </h2>
                            <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800" />
                        </div>

                        <div className="relative ml-5 border-l border-neutral-200 pl-8 dark:border-neutral-800 sm:ml-0 sm:pl-10">
                            <div className="space-y-6">
                                {section.items.map((item) => {
                                    const animationIndex = itemIndex++;

                                    return (
                                        <motion.article
                                            key={`${item.organization}-${item.title}`}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.08 * animationIndex }}
                                            className="relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 sm:p-6"
                                        >
                                            <div className="absolute -left-[3.82rem] top-6 hidden rounded-full bg-background p-1 sm:block">
                                                <ExperienceIcon kind={item.kind} />
                                            </div>

                                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-3 flex items-center gap-3 sm:hidden">
                                                        <ExperienceIcon kind={item.kind} />
                                                        {item.date && (
                                                            <span className="text-sm font-medium text-neutral-500">{item.date}</span>
                                                        )}
                                                    </div>

                                                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                                                        {item.organizationUrl ? (
                                                            <a
                                                                href={item.organizationUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xl font-semibold text-primary transition-opacity hover:opacity-70"
                                                            >
                                                                {item.organization}
                                                            </a>
                                                        ) : (
                                                            <h3 className="text-xl font-semibold text-primary">{item.organization}</h3>
                                                        )}
                                                        {item.date && (
                                                            <span className="hidden shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 sm:inline-flex">
                                                                {item.date}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="font-medium text-accent">{item.title}</p>

                                                    {item.location && (
                                                        <p className="mt-2 flex items-center gap-1.5 text-sm text-neutral-500">
                                                            <MapPin className="h-4 w-4" aria-hidden="true" />
                                                            {item.location}
                                                        </p>
                                                    )}

                                                    {item.description && (
                                                        <p className="mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">
                                                            {item.description}
                                                        </p>
                                                    )}

                                                    {item.advisor && (
                                                        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
                                                            <span className="font-medium text-primary">{item.advisorLabel || 'Advisor'}:</span>{' '}
                                                            {item.advisorUrl ? (
                                                                <a
                                                                    href={item.advisorUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-accent transition-opacity hover:opacity-70"
                                                                >
                                                                    {item.advisor}
                                                                </a>
                                                            ) : item.advisor}
                                                        </p>
                                                    )}
                                                </div>

                                                <ExperienceImage item={item} />
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </motion.div>
    );
}
