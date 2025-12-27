import { useForm, usePage, router } from "@inertiajs/react";
import { SharedData } from "@/types";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, Save, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PromptForm() {
    const { auth, session_data } = usePage<SharedData>().props;
    const [copied, setCopied] = useState(false);

    const { data, setData, processing, errors } = useForm({
        keyword: session_data?.savedKeyword || '',
        audience: session_data?.savedAudience || 'Working Professionals',
        duration: session_data?.savedDuration || '60-90 seconds',
    });

    const fullPrompt = session_data?.savedPrompt || '';
    // Splits the prompt into Step 2, 3, and 4 sections
    const steps = fullPrompt.split(/## STEP \d:/).filter(Boolean);

    const handleGenerate = () => {
        router.post('/prompts/generate', data, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth?.user) return router.visit('/login');

        router.post('/prompts-generator/prompts', {
            keyword: data.keyword,
            prompt: fullPrompt
        }, {
            onSuccess: () => toast.success('Script saved to profile!')
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fullPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        router.post(route('prompts.reset'), {}, {
            onSuccess: () => {
                // Manually reset local form data
                setData({
                    keyword: '',
                    audience: 'Working Professionals',
                    duration: '60-90 seconds'
                });
            }
        });
    };


    return (
        <div className="space-y-8">
            {/* INPUT SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="md:col-span-2">
                    <Label htmlFor="keyword">What is your video topic?</Label>
                    <textarea
                        id="keyword"
                        value={data.keyword}
                        onChange={e => setData('keyword', e.target.value)}
                        placeholder="e.g. 5 AI tools for productivity..."
                        className="w-full mt-2 p-3 rounded-lg border border-gray-200 dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none min-h-[100px]"
                    />
                    {errors.keyword && <p className="text-red-500 text-sm mt-1">{errors.keyword}</p>}
                </div>

                <div>
                    <Label>Target Audience</Label>
                    <select 
                        value={data.audience} 
                        onChange={e => setData('audience', e.target.value)}
                        className="w-full mt-2 p-3 rounded-lg border border-gray-200 dark:bg-gray-900"
                    >
                        <option>Working Professionals</option>
                        <option>Content Creators</option>
                        <option>Students</option>
                        <option>Business Owners</option>
                    </select>
                </div>

                <div>
                    <Label>Desired Duration</Label>
                    <select 
                        value={data.duration} 
                        onChange={e => setData('duration', e.target.value)}
                        className="w-full mt-2 p-3 rounded-lg border border-gray-200 dark:bg-gray-900"
                    >
                        <option>30-60 seconds</option>
                        <option>60-90 seconds</option>
                        <option>2-3 minutes</option>
                    </select>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={processing || !data.keyword}
                    className="md:col-span-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                    {processing ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                    Generate Script
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="cursor-pointer text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
                >
                    Clear and Start Over
                </button>
            </div>

            {/* OUTPUT SECTION */}
            {steps.length > 0 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    {['Idea Generation', 'Story Structure', 'Spoken Script'].map((title, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 border-l-4 border-purple-500 p-6 rounded-r-xl shadow-md">
                            <h4 className="text-xs font-black text-purple-600 uppercase tracking-widest mb-2">Step {i+2}: {title}</h4>
                            <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                                {steps[i]}
                            </div>
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 py-4 rounded-xl font-semibold">
                            {copied ? <Check className="text-green-500" /> : <Copy size={18} />}
                            {copied ? 'Copied to Clipboard' : 'Copy Full Script'}
                        </button>
                        <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 dark:shadow-none">
                            <Save size={18} />
                            {auth?.user ? 'Save to Profile' : 'Login to Save'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
