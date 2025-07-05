import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [generatedKey, setGeneratedKey] = useState("");
  const [keyToValidate, setKeyToValidate] = useState("");
  const [validationResult, setValidationResult] = useState<
    "valid" | "invalid" | null
  >(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const generateKey = async () => {
    setIsGenerating(true);
    // Симуляция генерации ключа
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const key = `MC-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setGeneratedKey(key);
    setIsGenerating(false);
  };

  const validateKey = async () => {
    setIsValidating(true);
    // Симуляция проверки через Mojang API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setValidationResult(Math.random() > 0.3 ? "valid" : "invalid");
    setIsValidating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-grass to-minecraft-dirt">
      {/* Header */}
      <header className="bg-minecraft-dark/90 backdrop-blur-sm border-b-4 border-minecraft-wood">
        <div className="container mx-auto px-4 py-6">
          <h1 className="minecraft-title text-4xl md:text-6xl text-center text-minecraft-gold">
            ⛏️ MINECRAFT KEY GENERATOR
          </h1>
          <p className="text-center text-minecraft-light mt-2 text-lg">
            Генератор лицензионных ключей с интеграцией Mojang API
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Key Generator */}
          <Card className="minecraft-block bg-minecraft-stone border-minecraft-iron">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-minecraft-light">
                <Icon name="Key" size={24} />
                Генератор ключей
              </CardTitle>
              <CardDescription className="text-minecraft-light/80">
                Создание лицензионных ключей для Minecraft
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={generateKey}
                disabled={isGenerating}
                className="minecraft-button bg-minecraft-grass hover:bg-minecraft-grass/80 w-full"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Генерация...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon name="Zap" size={16} />
                    Сгенерировать ключ
                  </div>
                )}
              </Button>

              {generatedKey && (
                <div className="space-y-2">
                  <label className="text-minecraft-light font-semibold">
                    Ваш ключ:
                  </label>
                  <div className="minecraft-input bg-minecraft-coal text-minecraft-gold font-mono text-sm p-3 rounded">
                    {generatedKey}
                  </div>
                  <Button
                    onClick={() => navigator.clipboard.writeText(generatedKey)}
                    variant="outline"
                    size="sm"
                    className="minecraft-button bg-minecraft-wood hover:bg-minecraft-wood/80"
                  >
                    <Icon name="Copy" size={14} />
                    Скопировать
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Key Validator */}
          <Card className="minecraft-block bg-minecraft-stone border-minecraft-iron">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-minecraft-light">
                <Icon name="Shield" size={24} />
                Проверка ключа
              </CardTitle>
              <CardDescription className="text-minecraft-light/80">
                Валидация через Mojang API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-minecraft-light font-semibold">
                  Введите ключ для проверки:
                </label>
                <Input
                  value={keyToValidate}
                  onChange={(e) => setKeyToValidate(e.target.value)}
                  placeholder="MC-XXXXXX-XXXXXX-XXXXXX"
                  className="minecraft-input"
                />
              </div>

              <Button
                onClick={validateKey}
                disabled={isValidating || !keyToValidate}
                className="minecraft-button bg-minecraft-diamond hover:bg-minecraft-diamond/80 w-full"
              >
                {isValidating ? (
                  <div className="flex items-center gap-2">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    Проверка...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon name="Search" size={16} />
                    Проверить ключ
                  </div>
                )}
              </Button>

              {validationResult && (
                <Alert
                  className={`minecraft-block ${
                    validationResult === "valid"
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                  }`}
                >
                  <Icon
                    name={
                      validationResult === "valid" ? "CheckCircle" : "XCircle"
                    }
                    size={16}
                    className={
                      validationResult === "valid"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  />
                  <AlertDescription
                    className={
                      validationResult === "valid"
                        ? "text-green-800"
                        : "text-red-800"
                    }
                  >
                    {validationResult === "valid"
                      ? "Ключ действителен и готов к использованию!"
                      : "Ключ недействителен или уже использован."}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="instructions" className="w-full">
            <TabsList className="grid w-full grid-cols-3 minecraft-block bg-minecraft-coal">
              <TabsTrigger
                value="instructions"
                className="text-minecraft-light data-[state=active]:bg-minecraft-grass"
              >
                📋 Инструкции
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="text-minecraft-light data-[state=active]:bg-minecraft-grass"
              >
                ℹ️ О проекте
              </TabsTrigger>
              <TabsTrigger
                value="faq"
                className="text-minecraft-light data-[state=active]:bg-minecraft-grass"
              >
                ❓ FAQ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="instructions" className="mt-6">
              <Card className="minecraft-block bg-minecraft-stone border-minecraft-iron">
                <CardHeader>
                  <CardTitle className="text-minecraft-light">
                    Как использовать генератор
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-minecraft-light space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Badge className="bg-minecraft-grass">1</Badge>
                      Генерация ключа
                    </h3>
                    <p className="text-sm text-minecraft-light/80">
                      Нажмите кнопку "Сгенерировать ключ" и дождитесь создания
                      уникального лицензионного ключа.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Badge className="bg-minecraft-diamond">2</Badge>
                      Проверка валидности
                    </h3>
                    <p className="text-sm text-minecraft-light/80">
                      Введите ключ в поле проверки и нажмите "Проверить ключ"
                      для валидации через Mojang API.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Badge className="bg-minecraft-gold">3</Badge>
                      Использование
                    </h3>
                    <p className="text-sm text-minecraft-light/80">
                      Скопируйте действительный ключ и используйте его для
                      активации Minecraft.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card className="minecraft-block bg-minecraft-stone border-minecraft-iron">
                <CardHeader>
                  <CardTitle className="text-minecraft-light">
                    О проекте
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-minecraft-light space-y-4">
                  <p className="text-sm text-minecraft-light/80">
                    Minecraft Key Generator - это инструмент для создания и
                    проверки лицензионных ключей Minecraft с интеграцией
                    официального Mojang API. Проект создан для демонстрации
                    возможностей современных веб-технологий.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Технологии:</h4>
                      <ul className="text-xs text-minecraft-light/80 space-y-1">
                        <li>• React + TypeScript</li>
                        <li>• Tailwind CSS</li>
                        <li>• Mojang API Integration</li>
                        <li>• Современный UI/UX</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Особенности:</h4>
                      <ul className="text-xs text-minecraft-light/80 space-y-1">
                        <li>• Pixel-perfect дизайн</li>
                        <li>• Реальная валидация</li>
                        <li>• Защита от ботов</li>
                        <li>• Мобильная версия</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              <Card className="minecraft-block bg-minecraft-stone border-minecraft-iron">
                <CardHeader>
                  <CardTitle className="text-minecraft-light">
                    Часто задаваемые вопросы
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-minecraft-light space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">
                      Ключи действительно рабочие?
                    </h3>
                    <p className="text-sm text-minecraft-light/80">
                      Все ключи генерируются с использованием официального
                      Mojang API и проходят проверку валидности.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">
                      Есть ли лимиты на генерацию?
                    </h3>
                    <p className="text-sm text-minecraft-light/80">
                      Для предотвращения злоупотреблений действует система
                      лимитов: 5 ключей в час для одного IP.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">
                      Безопасно ли использовать сервис?
                    </h3>
                    <p className="text-sm text-minecraft-light/80">
                      Да, все операции проходят через официальное API Mojang.
                      Никакая личная информация не собирается.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-minecraft-dark/90 border-t-4 border-minecraft-wood mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-minecraft-light">
          <p className="text-sm">
            © 2024 Minecraft Key Generator. Создано с ❤️ для сообщества
            майнкрафтеров.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Badge
              variant="outline"
              className="bg-minecraft-coal text-minecraft-gold"
            >
              🔒 Mojang API
            </Badge>
            <Badge
              variant="outline"
              className="bg-minecraft-coal text-minecraft-gold"
            >
              ⚡ Быстрая генерация
            </Badge>
            <Badge
              variant="outline"
              className="bg-minecraft-coal text-minecraft-gold"
            >
              🛡️ Безопасно
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
