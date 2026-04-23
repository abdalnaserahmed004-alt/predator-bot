/* =========== 亗 WEKA_7_BOT - ULTRA DATABASE 亗 ===========
 * 🛠️ Developer : Ahmed_wek7
 * 📱 WhatsApp  : 201210155616
 * 📢 Channel   : 亗 𝐀𝐇𝐌𝐄𝐃_𝐖𝐄𝐊𝟕 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 亗
 * 🐍 Component : High-Performance Proxy-Based JSON DB ⚡
 * ======================================================== */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class UltraDB {
    #path;
    #saveTimer = null;
    
    constructor() {
        // تحديد مسار تخزين البيانات السيادية
        this.#path = path.join(__dirname, 'database.json');
        
        const dir = path.dirname(this.#path);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
        
        this.data = this.#load();
        return this.#createProxy();
    }
    
    // بروتوكول استعادة البيانات من الذاكرة الصلبة
    #load() {
        try {
            if (existsSync(this.#path)) {
                const raw = readFileSync(this.#path, 'utf-8');
                if (raw.trim()) {
                    const parsed = JSON.parse(raw);
                    // التأكد من هيكلة البيانات السيادية
                    if (!parsed.groups) parsed.groups = {};
                    if (!parsed.users) parsed.users = {};
                    if (parsed.settings) parsed.settings = {}; // إعدادات البوت العامة
                    return parsed;
                }
            }
        } catch (e) {
            console.error("亗 [DB ERROR]: " + e.message);
        }
        return { groups: {}, users: {}, settings: {} };
    }
    
    // بروتوكول الحفظ الذكي (Debounced Save)
    #save() {
        if (this.#saveTimer) clearTimeout(this.#saveTimer);
        this.#saveTimer = setTimeout(() => {
            try {
                writeFileSync(this.#path, JSON.stringify(this.data, null, 2));
            } catch (e) {
                console.error("亗 [DB SAVE ERROR]: " + e.message);
            }
            this.#saveTimer = null;
        }, 100); // تأخير بسيط لضمان عدم إرهاق الهارد ديسك
    }
    
    // رادار كشف الـ ID الصحيح (فلترة النرمات)
    #isValidId(id) {
        if (!id || typeof id !== 'string') return false;
        // استبعاد القنوات، الـ LID، والبيانات الوهمية
        return id.includes('@') && !id.includes('@newsletter') && !id.includes('@lid');
    }
    
    #createProxy() {
        const self = this;
        
        return new Proxy(this.data, {
            get(target, prop) {
                if (prop === 'groups' || prop === 'users') {
                    return new Proxy(target[prop], {
                        get(subTarget, id) {
                            if (!self.#isValidId(id)) return undefined;
                            
                            // إنشاء مساحة بيانات فورية لو مش موجودة
                            if (!subTarget[id]) {
                                subTarget[id] = {};
                                self.#save();
                            }
                            
                            return new Proxy(subTarget[id], {
                                set(obj, key, val) {
                                    // منع تخزين القيم الـ "نرم" (Falsy values)
                                    if (val === false || val === 0 || val === undefined || val === null) {
                                        delete obj[key];
                                    } else {
                                        obj[key] = val;
                                    }
                                    
                                    // تنظيف أوتوماتيكي لو الـ ID بقى فاضي
                                    if (Object.keys(obj).length === 0) {
                                        delete subTarget[id];
                                    }
                                    
                                    self.#save();
                                    return true;
                                },
                                deleteProperty(obj, key) {
                                    delete obj[key];
                                    if (Object.keys(obj).length === 0) {
                                        delete subTarget[id];
                                    }
                                    self.#save();
                                    return true;
                                }
                            });
                        },
                        set(subTarget, id, val) {
                            if (!self.#isValidId(id)) return false;
                            if (val && typeof val === 'object' && Object.keys(val).length > 0) {
                                subTarget[id] = val;
                            } else {
                                delete subTarget[id];
                            }
                            self.#save();
                            return true;
                        }
                    });
                }
                
                return target[prop];
            },
            
            set(target, prop, val) {
                // منع التلاعب المباشر بالهياكل الأساسية
                if (prop === 'groups' || prop === 'users') return false;
                target[prop] = val;
                self.#save();
                return true;
            }
        });
    }
}

export default UltraDB;
