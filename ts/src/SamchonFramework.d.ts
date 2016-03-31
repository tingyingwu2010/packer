/// <reference path="std.d.ts" />
declare namespace samchon {
    /**
     * <p> Trace arguments on screen. </p>
     * <p> Displays arguments on screen by <i>document.write</i>. </p>
     *
     * <p> If any argument in a trace statement includes a data type other than a string, the trace function
     * invokes the associated toString() method for that data type. If the argument which is not a string
     * doesn't have <i>toString()</i> method, only "[object Object]" words will be traced. </p>
     *
     * <p> Trace prints words in web page direclty. It can harm ordinary layout of the page. </p>
     *
     * @param args One or more (comma separated) expressions to evaluate.
     *			   For multiple expressions, a space is inserted between each expression in the output.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    function trace(...args: any[]): void;
}
declare namespace samchon.example.xml {
    function main(): void;
}
declare namespace samchon.example.packer {
    interface Instance extends protocol.IEntity {
        /**
         * Get name.
         */
        getName(): string;
        /**
         * Get price.
         */
        getPrice(): number;
        /**
         * Get volume.
         */
        getVolume(): number;
        /**
         * Get weight.
         */
        getWeight(): number;
    }
}
declare namespace samchon.protocol {
    /**
     * @inheritdoc
     */
    abstract class EntityArray<Ety extends IEntity> extends std.Vector<Ety> {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * <p> Construct data of the Entity from an XML object. </p>
         *
         * <p> Constructs the EntityArray's own member variables only from the input XML object. </p>
         *
         * <p> Do not consider about constructing children Entity objects' data in EntityArray::construct().
         * Those children Entity objects' data will constructed by their own construct() method. Even insertion
         * of XML objects representing children are done by abstract method of EntityArray::toXML(). </p>
         *
         * <p> Constructs only data of EntityArray's own. </p>
         *
         * @inheritdoc
         */
        construct(xml: library.XML): void;
        /**
         * <p> Factory method of a child Entity. </p>
         *
         * <p> EntityArray::createChild() is a factory method creating a new child Entity which is belonged
         * to the EntityArray. This method is called by EntityArray::construct(). The children construction
         * methods Entity::construct() will be called by abstract method of the EntityArray::construct(). </p>
         *
         * @return A new child Entity belongs to EntityArray.
         */
        protected abstract createChild(xml: library.XML): Ety;
        /**
         * @inheritdoc
         */
        key(): any;
        /**
         * @inheritdoc
         */
        has(key: any): boolean;
        /**
         * @inheritdoc
         */
        get(key: string): Ety;
        /**
         * @inheritdoc
         */
        abstract TAG(): string;
        /**
         * <p> A tag name of children objects. </p>
         */
        abstract CHILD_TAG(): string;
        /**
         * <p> Get an XML object represents the EntityArray. </p>
         *
         * <p> Archives the EntityArray's own member variables only to the returned XML object. </p>
         *
         * <p> Do not consider about archiving children Entity objects' data in EntityArray::toXML().
         * Those children Entity objects will converted to XML object by their own toXML() method. The
         * insertion of XML objects representing children are done by abstract method of
         * EntityArray::toXML(). </p>
         *
         * <p> Archives only data of EntityArray's own. </p>
         *
         * @inheritdoc
         */
        toXML(): library.XML;
    }
}
declare namespace samchon.example.packer {
    /**
     * <p> A packer planning the best packaging. </p>
     * <p> Retrieves the solution of packaging by combination permuation and factorial case. </p>
     *
     * <h4> Warning. </h4>
     * <p> Be careful about number of products and wrappers. </p>
     * <p> The time complexity of Packer overs O(m^n). Elapsed time of calculation increases enourmously.
     * Do not use Packer if the digits of number of products or wrappers overs 2. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Packer extends protocol.EntityArray<WrapperArray> {
        /**
         * <p> Product(s) to package in some Wrapper(s). </p>
         */
        protected productArray: ProductArray;
        /**
         * <p> Construct from an argument. </p>
         */
        constructor(obj?: any);
        protected createChild(xml: library.XML): WrapperArray;
        /**
         * <p> Find the best packaging method. </p>
         */
        optimize(start?: number, size?: number): void;
        /**
         * <p> Calculate price of the wrappers. </p>
         */
        calcPrice(): number;
        TAG(): string;
        CHILD_TAG(): string;
        static main(): void;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> An entity, a standard data class. </p>
     *
     * <p> Entity is a class for standardization of expression method using on network I/O by XML. If
     * Invoke is a standard message protocol of Samchon Framework which must be kept, Entity is a
     * recommended semi-protocol of message for expressing a data class. Following the semi-protocol
     * Entity is not imposed but encouraged. </p>
     *
     * <p> As we could get advantages from standardization of message for network I/O with Invoke,
     * we can get additional advantage from standardizing expression method of data class with Entity.
     * We do not need to know a part of network communication. Thus, with the Entity, we can only
     * concentrate on entity's own logics and relationships between another entities. Entity does not
     * need to how network communications are being done. </p>
     *
     * <p> I say repeatedly. Expression method of Entity is recommended, but not imposed. It's a semi
     * protocol for network I/O but not a essential protocol must be kept. The expression method of
     * Entity, using on network I/O, is expressed by XML string. </p>
     *
     * <p> If your own network system has a critical performance issue on communication data class,
     * it would be better to using binary communication (with ByteArray).
     * Don't worry about the problem! Invoke also provides methods for binary data (ByteArray). </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    abstract class Entity implements IEntity {
        /**
         * <p> Default Constructor. </p>
         */
        constructor();
        construct(xml: library.XML): void;
        key(): any;
        abstract TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace samchon.example.packer {
    class Product extends protocol.Entity implements Instance {
        protected name: string;
        protected price: number;
        protected volume: number;
        protected weight: number;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from members.
         *
         * @param name Name of the Product.
         * @param price Price of the Product.
         * @param volume Volume of the Product.
         * @param weight Weight of the Product.
         */
        constructor(name: string, price: number, volume: number, weight: number);
        getName(): string;
        getPrice(): number;
        getVolume(): number;
        getWeight(): number;
        TAG(): string;
    }
}
declare namespace samchon.example.packer {
    class ProductArray extends protocol.EntityArray<Product> {
        /**
         * Default Constructor.
         */
        constructor();
        protected createChild(xml: library.XML): Product;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace samchon.example.packer {
    class Wrapper extends ProductArray implements Instance {
        protected name: string;
        protected price: number;
        protected volume: number;
        protected weight: number;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Copy Constructor.
         *
         * @param wrapper A Wrapper to copy
         */
        constructor(wrapper: Wrapper);
        /**
         * Construct from members.
         *
         * @param name Name of the Wrapper.
         * @param price Price of the Wrapper.
         * @param volume Volume of the Wrapper.
         * @param weight Weight of the Wrapper.
         */
        constructor(name: string, price: number, volume: number, weight: number);
        protected createChild(xml: library.XML): Product;
        tryInsert(product: Product): boolean;
        getName(): string;
        getPrice(): number;
        getVolume(): number;
        getWeight(): number;
        TAG(): string;
    }
}
declare namespace samchon.example.packer {
    class WrapperArray extends protocol.EntityArray<Wrapper> {
        /**
         * <p> A list for reserved Product(s). </p>
         */
        private reserved;
        /**
         * <p> A sample wrapper used to copy. </p>
         */
        private sample;
        /**
         * <p> Construct from a sample wrapper. </p>
         *
         * @param sample A sample wrapper used to copy wrappers.
         */
        constructor(sample?: Wrapper);
        construct(xml: library.XML): void;
        protected createChild(xml: library.XML): Wrapper;
        /**
         * <p> Try to insert a product into reserved list. </p>
         *
         * <p> If the Product's volume and weight is equal or less than the Wrapper categorized so that enable to
         * insert in a Wrapper, reserve the Product and returns <i>true</i>. If not, does not reserve and just
         * return <i>false</i>. </p>
         *
         * @return Whether the Product's volume and weight is equal or less than the Wrapper.
         */
        tryInsert(product: Product): boolean;
        /**
         * <p> Optimize to retrieve the best solution. </p>
         *
         * <p> Retrieves the best solution of packaging in level of WrapperArray. </p>
         * <p> Shuffles sequence of reserved Product(s) by samchon::library::FactorialGenerator and insert the reserved
         * Products(s) following the sequence creating Wrapper(s) as needed. Between the sequences from FactorialGenerator,
         * retrieve and determine the best solution. </p>
         *
         * <h4> Note. </h4>
         * <p> Sequence of inserting Product can affeact to numbers of Wrapper(s) to be used. </p>
         * <p> It's the reason why even WrapperArray has the optimize() method. </p>
         */
        optimize(): void;
        /**
         * <p> Calculate price of the Wrapper(s). </p>
         *
         * <p> Calculates price of all wrappers'. The price does not contain inserted products'. </p>
         */
        calcPrice(): number;
        /**
         * <p> Get sample. </p>
         */
        getSample(): Wrapper;
        TAG(): string;
        CHILD_TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace samchon.library {
    /**
     * An event class.
     *
     * <ul>
     *  <li> Comments from - https://developer.mozilla.org/en-US/docs/Web/API/Event/ </li>
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class BasicEvent implements Event {
        /**
         *  No event is being processed at this time.
         */
        static NONE: number;
        NONE: number;
        /**
         * The event is being propagated through the target's ancestor objects. This process starts with the Window,
         * then Document, then the HTMLHtmlElement, and so on through the elements until the target's parent is reached.
         * Event listeners registered for capture mode when EventTarget.addEventListener() was called are triggered
         * during this phase.
         */
        static CAPTURING_PHASE: number;
        CAPTURING_PHASE: number;
        /**
         * The event has arrived at the event's target. Event listeners registered for this phase are called at this
         * time. If Event.bubbles is false, processing the event is finished after this phase is complete.
         */
        static AT_TARGET: number;
        AT_TARGET: number;
        /**
         * The event is propagating back up through the target's ancestors in reverse order, starting with the parent,
         * and eventually reaching the containing Window. This is known as bubbling, and occurs only if Event.bubbles
         * is true. Event listeners registered for this phase are triggered during this process.
         */
        static BUBBLING_PHASE: number;
        BUBBLING_PHASE: number;
        private type_;
        private target_;
        private currentTarget_;
        protected trusted_: boolean;
        protected bubbles_: boolean;
        protected cancelable_: boolean;
        protected defaultPrevented_: boolean;
        protected cancelBubble_: boolean;
        private timeStamp_;
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        /**
         * Initializes the value of an Event created. If the event has already being dispatched, this method does nothing.
         */
        initEvent(type: string, bubbles: boolean, cancelable: boolean): void;
        /**
         * Cancels the event (if it is cancelable).
         */
        preventDefault(): void;
        /**
         * For this particular event, no other listener will be called. Neither those attached on the same element,
         * nor those attached on elements which will be traversed later (in capture phase, for instance).
         */
        stopImmediatePropagation(): void;
        /**
         * Stops the propagation of events further along in the DOM.
         */
        stopPropagation(): void;
        /**
         * The name of the event (case-insensitive).
         */
        type: string;
        /**
         * A reference to the target to which the event was originally dispatched.
         */
        target: EventTarget;
        /**
         * A reference to the currently registered target for the event.
         */
        currentTarget: EventTarget;
        /**
         * A proprietary alias for the standard Event.target property. It is specific to old versions of
         * Microsoft Internet Explorer.
         */
        srcElement: Element;
        /**
         * Indicates whether or not the event was initiated by the browser (after a user click for instance) or
         * by a script (using an event creation method, like event.initEvent).
         */
        isTrusted: boolean;
        /**
         * A boolean indicating whether the event bubbles up through the DOM or not.
         */
        bubbles: boolean;
        /**
         * A boolean indicating whether the event is cancelable.
         */
        cancelable: boolean;
        /**
         * Indicates which phase of the event flow is currently being evaluated.
         */
        eventPhase: number;
        /**
         * Returns a boolean indicating whether or not event.preventDefault() was called on the event.
         */
        defaultPrevented: boolean;
        /**
         * Indicates if event bubbling for this event has been canceled or not. It is set to false by default, allowing
         * the event to bubble up the DOM, if it is a bubbleable event. Setting this property to true stops the event
         * from bubbling up the DOM. Not all events are allowed to bubble up the DOM.
         */
        cancelBubble: boolean;
        /**
         * The time that the event was created.
         */
        timeStamp: number;
        /**
         * Don't know what it is.
         */
        returnValue: boolean;
    }
}
declare namespace samchon.library {
    /**
     * <p> Case generator. </p>
     *
     * <p> CaseGenerator is an abstract case generator using like a matrix. </p>
     * <ul>
     *  <li> nTTr(n^r) -> CombinedPermutationGenerator </li>
     *  <li> nPr -> PermutationGenerator </li>
     *  <li> n! -> FactorialGenerator </li>
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    abstract class CaseGenerator {
        /**
         * <p> Size, the number of all cases. </p>
         */
        protected size_: number;
        /**
         * <p> N, size of the candidates. </p>
         */
        protected n_: number;
        /**
         * <p> R, size of elements of each case. </p>
         */
        protected r_: number;
        /**
         * <p> Construct from size of N and R. </p>
         *
         * @param n Size of candidates.
         * @param r Size of elements of each case.
         */
        constructor(n: number, r: number);
        /**
         * <p> Get size of all cases. </p>
         *
         * @return Get a number of the all cases.
         */
        size(): number;
        /**
         * <p> Get size of the N. </p>
         */
        n(): number;
        /**
         * <p> Get size of the R. </p>
         */
        r(): number;
        /**
         * <p> Get index'th case. </p>
         *
         * @param index Index number
         * @return The row of the index'th in combined permuation case
         */
        abstract at(index: number): Array<number>;
    }
}
declare namespace samchon.library {
    /**
     * <p> A combined-permutation case generator. </p>
     * <p> <sub>n</sub>TT<sub>r</sub> </p>
     *
     * @inheritdoc
     * @author Jeongho Nam <http://samchon.org>
     */
    class CombinedPermutationGenerator extends CaseGenerator {
        /**
         * <p> An array using for dividing each element index. </p>
         */
        private dividerArray;
        /**
         * <p> Construct from size of N and R. </p>
         *
         * @param n Size of candidates.
         * @param r Size of elements of each case.
         */
        constructor(n: number, r: number);
        at(index: number): Array<number>;
    }
}
declare namespace samchon.library {
    /**
     * <p> A permutation case generator. </p>
     * <p> nPr </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     * @inheritdoc
     */
    class PermuationGenerator extends CaseGenerator {
        /**
         * <p> Construct from size of N and R. </p>
         *
         * @param n Size of candidates.
         * @param r Size of elements of each case.
         */
        constructor(n: number, r: number);
        /**
         * @inheritdoc
         */
        at(index: number): Array<number>;
    }
}
declare namespace samchon.library {
    class FactorialGenerator extends PermuationGenerator {
        /**
         * Construct from factorial size N.
         *
         * @param n Factoria size N.
         */
        constructor(n: number);
    }
}
declare namespace samchon.library {
    class ProgressEvent extends BasicEvent {
        static PROGRESS: string;
        protected numerator_: number;
        protected denominator_: number;
        constructor(type: string, numerator: number, denominator: number);
        numerator: number;
        denominator: number;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> A network driver for an external system. </p>
     *
     * <p> ExternalSystem is a boundary class interacting with an external system by network communication.
     * Also, ExternalSystem is an abstract class that a network role, which one is server and which one is
     * client, is not determined yet. </p>
     *
     * <p> The ExternalSystem has ExternalSystemRole(s) groupped methods, handling Invoke message
     * interacting with the external system, by subject or unit of a moudle. The ExternalSystemRole is
     * categorized in a 'control'. </p>
     *
     * <h4> Note </h4>
     * <p> The ExternalSystem class takes a role of interaction with external system in network level.
     * However, within a framework of Samchon Framework, a boundary class like the ExternalSystem is
     * not such important. You can find some evidence in a relationship between ExternalSystemArray,
     * ExternalSystem and ExternalSystemRole. </p>
     *
     * <p> Of course, the ExternalSystemRole is belonged to an ExternalSystem. However, if you
     * access an ExternalSystemRole from an ExternalSystemArray directly, not passing by a belonged
     * ExternalSystem, and send an Invoke message even you're not knowing which ExternalSystem is
     * related in, it's called "Proxy pattern".
     *
     * <p> Like the explanation of "Proxy pattern", you can utilize an ExternalSystemRole as a proxy
     * of an ExternalSystem. With the pattern, you can only concentrate on ExternalSystemRole itself,
     * what to do with Invoke message, irrespective of the ExternalSystemRole is belonged to which
     * ExternalSystem. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    abstract class ExternalSystem extends EntityArray<ExternalSystemRole> implements IProtocol {
        /**
         * <p> A driver for interacting with (real, physical) external system. </p>
         */
        protected driver: ServerConnector;
        /**
         * <p> A name can identify an external system. </p>
         *
         * <p> The name must be unique in ExternalSystemArray. </p>
         */
        protected name: string;
        /**
         * <p> An ip address of an external system. </p>
         */
        protected ip: string;
        /**
         * <p> A port number of an external system. </p>
         */
        protected port: number;
        /**
         * <p> Default Constructor. </p>
         */
        constructor();
        /**
         * <p> Start interaction. </p>
         * <p> An abstract method starting interaction with an external system. </p>
         *
         * <p> If an external systems are a server, starts connection and listening Inovoke message,
         * else clients, just starts listening only. You also can addict your own procudures of starting
         * the driver, but if you directly override method of abstract ExternalSystem, be careful about
         * virtual inheritance. </p>
         */
        start(): void;
        key(): any;
        /**
         * <p> Get name. </p>
         */
        getName(): string;
        /**
         * <p> Get ip address of the external system. </p>
         */
        getIP(): string;
        /**
         * <p> Get port number of the external system. </p>
         */
        getPort(): number;
        sendData(invoke: Invoke): void;
        replyData(invoke: Invoke): void;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> An array of ExternalSystem(s). </p>
     *
     * <p> ExternalSystemArray is an abstract class containing and managing external system drivers. </p>
     *
     * <p> Also, ExternalSystemArray can access to ExternalSystemRole(s) directly. With the method, you
     * can use an ExternalSystemRole as "logical proxy" of an ExternalSystem. Of course, the
     * ExternalSystemRole is belonged to an ExternalSystem. However, if you access an ExternalSystemRole
     * from an ExternalSystemArray directly, not passing by a belonged ExternalSystem, and send an Invoke
     * message even you're not knowing which ExternalSystem is related in, the ExternalSystemRole acted
     * a role of proxy. </p>
     *
     * <p> It's called as "Proxy pattern". With the pattern, you can only concentrate on
     * ExternalSystemRole itself, what to do with Invoke message, irrespective of the ExternalSystemRole
     * is belonged to which ExternalSystem. </p>
     *
     * <ul>
     *  <li> ExternalSystemArray::getRole("something")->sendData(invoke); </li>
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    abstract class ExternalSystemArray extends EntityArray<ExternalSystem> implements IProtocol {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * <p> Start interaction. </p>
         * <p> An abstract method starting interaction with external systems. </p>
         *
         * <p> If external systems are servers, starts connection to them, else clients, opens a server
         * and accepts the external systems. You can addict your own procudures of starting drivers, but
         * if you directly override method of abstract ExternalSystemArray, be careful about virtual
         * inheritance. </p>
         */
        start(): void;
        /**
         * <p> Test whether has a role. </p>
         *
         * @param name Name of an ExternalSystemRole.
         * @return Whether has or not.
         */
        hasRole(key: string): boolean;
        /**
         * <p> Get a role. </p>
         *
         * @param name Name of an ExternalSystemRole
         * @return A shared pointer of specialized role
         */
        getRole(key: string): ExternalSystemRole;
        sendData(invoke: Invoke): void;
        replyData(invoke: Invoke): void;
        TAG(): string;
        CHILD_TAG(): string;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> A role belongs to an external system. </p>
     *
     * <p> ExternalSystemRole is a 'control' class groupping methods, handling Invoke messages
     * interacting with an external system that the ExternalSystemRole is belonged to, by a subject or
     * unit of a module. <p>
     *
     * <p> ExternalSystemRole can be a "logical proxy" for an ExternalSystem which is containing the
     * ExternalSystemRole. Of course, the ExternalSystemRole is belonged to an ExternalSystem. However,
     * if you access an ExternalSystemRole from an ExternalSystemArray directly, not passing by a
     * belonged ExternalSystem, and send an Invoke message even you're not knowing which ExternalSystem
     * is related in, the ExternalSystemRole acted a role of proxy. </p>
     *
     * <p> It's called as "Proxy pattern". With the pattern, you can only concentrate on
     * ExternalSystemRole itself, what to do with Invoke message, irrespective of the ExternalSystemRole
     * is belonged to which ExternalSystem. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class ExternalSystemRole extends Entity implements IProtocol {
        /**
         * <p> A driver of external system containing the ExternalSystemRole. </p>
         */
        protected system: ExternalSystem;
        /**
         * <p> A name representing the role. </p>
         */
        protected name: string;
        protected sendListeners: std.HashSet<string>;
        /**
         * <p> Construct from external system driver. </p>
         *
         * @param system A driver of external system the ExternalSystemRole is belonged to.
         */
        constructor(system: ExternalSystem);
        construct(xml: library.XML): void;
        getName(): string;
        hasSendListener(key: string): boolean;
        sendData(invoke: Invoke): void;
        replyData(invoke: Invoke): void;
        TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> A history of an Invoke message. </p>
     *
     * <p> InvokeHistory is a class for reporting history log of an Invoke message with elapsed time
     * from a slave to its master.</p>
     *
     * <p> With the elapsed time, consumed time for a process of handling the Invoke message,
     * InvokeHistory is reported to the master. The master utilizies the elapsed time to estimating
     * performances of each slave system. With the estimated performan index, master retrives the
     * optimal solution of distributing processes. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class InvokeHistory extends Entity {
        /**
         * <p> An identifier. </p>
         */
        protected uid: number;
        /**
         * <p> A listener of the Invoke message. </p>
         *
         * <p> InvokeHistory does not archive entire data of an Invoke message. InvokeHistory only
         * archives its listener. The first, formal reason is to save space, avoid wasting spaces. </p>
         *
         * <p> The second, complicate reason is on an aspect of which systems are using the
         * InvokeHistory class. InvokeHistory is designed to let slave reports to master elapsed time
         * of a process used to handling the Invoke message. If you want to archive entire history log
         * of Invoke messages, then the subject should be master, not the slave using InvokeHistory
         * classes. </p>
         */
        protected listener: string;
        /**
         * <p> Start time of the history. </p>
         *
         * <p> Means start time of a process handling the Invoke message. The start time not only
         * has ordinary arguments represented Datetime (year to seconds), but also has very precise
         * values under seconds, which is expressed as nano seconds (10^-9). </p>
         *
         * <p> The precise start time will be used to calculate elapsed time with end time. </p>
         */
        protected startTime: Date;
        /**
         * <p> End time of the history. </p>
         *
         * @details
         * <p> Means end time of a process handling the Invoke message. The end time not only
         * has ordinary arguments represented Datetime (year to seconds), but also has very precise
         * values under seconds, which is expressed as nano seconds (10^-9). </p>
         *
         * <p> The precise end time will be used to calculate elapsed time with start time. </p>
         */
        protected endTime: Date;
        /**
         * <p> Construct from an Invoke message. </p>
         *
         * <p> InvokeHistory does not archive entire Invoke message, only archives its listener. </p>
         *
         * @param invoke A message to archive its history log
         */
        constructor(invoke: Invoke);
        /**
         * <p> Notify end of the process. </p>
         *
         * <p> Notifies end of a process handling the matched Invoke message to InvokeHistory. </p>
         * <p> InvokeHistory archives the end datetime and calculates elapsed time as nanoseconds. </p>
         */
        notifyEnd(): void;
        TAG(): string;
        toXML(): library.XML;
        /**
         * <p> Get an Invoke message. </p>
         *
         * <p> Returns an Invoke message to report to a master that how much time was elapsed on a
         * process handling the Invoke message. In master, those reports are used to estimate
         * performance of each slave system. </p>
         *
         * @return An Invoke message to report master.
         */
        toInvoke(): Invoke;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> A server connector for a physical client. </p>
     *
     * <p> ServerConnector is a class for a physical client connecting a server. If you want to connect
     * to a server,  then implements this ServerConnector and just override some methods like
     * getIP(), getPort() and replyData(). That's all. </p>
     *
     * <p> In Samchon Framework, package protocol, There are basic 3 + 1 components that can make any
     * type of network system in Samchon Framework. The basic 3 components are IProtocol, IServer and
     * IClient. The last, surplus one is the ServerConnector. Looking around classes in
     * Samchon Framework, especially module master and slave which are designed for realizing
     * distributed processing systems and parallel processing systems, physical client classes are all
     * derived from this ServerConnector. </p>
     *
     * <img src="interface.png" />
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class ServerConnector implements IProtocol {
        /**
         * <p> A parent object who listens and sends Invoke message. </p>
         *
         * <ul>
         * 	<li> ServerConnector.replyData(Invoke) -> parent.replyData(Invoke) </li>
         * </ul>
         */
        private parent;
        /**
         * <p> A socket for network I/O. </p>
         */
        private socket;
        /**
         * <p> Unused string from a server. </p>
         */
        private str;
        /**
         * <p> An open-event listener. </p>
         */
        onopen: Function;
        /**
         * <p> Constructor with parent. </p>
         */
        constructor(parent: IProtocol);
        /**
         * <p> Connects to a cloud server with specified host and port. </p>
         *
         * <p> If the connection fails immediately, either an event is dispatched or an exception is thrown:
         * an error event is dispatched if a host was specified, and an exception is thrown if no host
         * was specified. Otherwise, the status of the connection is reported by an event.
         * If the socket is already connected, the existing connection is closed first. </p>
         *
         * @param ip
         * 		The name or IP address of the host to connect to.
         * 		If no host is specified, the host that is contacted is the host where the calling
         * 		file resides. If you do not specify a host, use an event listener to determine whether
         * 		the connection was successful.
         * @param port
         * 		The port number to connect to.
         *
         * @throws IOError
         * 		No host was specified and the connection failed.
         * @throws SecurityError
         * 		This error occurs in SWF content for the following reasons:
         * 		Local untrusted SWF files may not communicate with the Internet. You can work around
         * 		this limitation by reclassifying the file as local-with-networking or as trusted.
         */
        connect(ip: string, port: number): void;
        /**
         * <p> Send data to the server. </p>
         */
        sendData(invoke: Invoke): void;
        /**
         * <p> Shift responsiblity of handling message to parent. </p>
         */
        replyData(invoke: Invoke): void;
        private handleConnect(event);
        /**
         * <p> Handling replied message. </p>
         */
        private handleReply(event);
    }
}
declare namespace samchon.protocol.service {
    /**
     * <p> An application, the top class in JS-UI. </p>
     *
     * <p> The Application is separated to three part, TopMenu, Movie and ServerConnector. </p>
     * <ul>
     * 	<li> <code>TopMenu</code>: Menu on the top. It's not an essential component. </li>
     * 	<li> <code>Movie</code>: Correspond with Service in Server. Movie has domain UI components(Movie) for the matched Service. </li>
     * 	<li> <code>ServerConnector</code>: The socket connecting to the Server. </li>
     * </ul>
     *
     * <p> The Application and its UI-layout is not fixed, essential component for Samchon Framework in Flex,
     * so it's okay to do not use the provided Application and make your custom Application.
     * But the custom Application, your own, has to contain the Movie and keep the construction routine. </p>
     *
     * <p> <img src="movie.png" /> </p>
     *
     * <h4> THE CONSTRUCTION ROUTINE </h4>
     * <ul>
     * 	<li>Socket Connection</li>
     * 	<ul>
     * 		<li>Connect to the CPP-Server</li>
     * 	</ul>
     * 	<li>Fetch authority</li>
     * 	<ul>
     * 		<li>Send a request to fetching authority</li>
     * 		<li>The window can be navigated to other page by the authority</li>
     * 	</ul>
     * 	<li>Construct Movie</li>
     * 	<ul>
     * 		<li>Determine a Movie by URLVariables::movie and construct it</li>
     * 	</ul>
     * 	<li>All the routines are done</li>
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Application implements IProtocol {
        /**
         * <p> Invoke Socket. </p>
         */
        protected socket: ServerConnector;
        /**
         * <p> A movie. </p>
         */
        protected movie: Movie;
        /**
         * <p> Construct from arguments. </p>
         *
         * @param movie A movie represents a service.
         * @param ip An ip address of cloud server to connect.
         * @param port A port number of cloud server to connect.
         */
        constructor(movie: Movie, ip: string, port: number);
        private handleConnect(event);
        /**
         * <p> Handle replied message or shift the responsibility. </p>
         */
        replyData(invoke: Invoke): void;
        /**
         * <p> Send a data to server. </p>
         */
        sendData(invoke: Invoke): void;
    }
}
declare namespace samchon.protocol.service {
    /**
     * A movie belonged to an Application.
     */
    class Movie implements IProtocol {
        /**
         * <p> An application the movie is belonged to
         */
        protected application: Application;
        /**
         * Handle replied data.
         */
        replyData(invoke: Invoke): void;
        /**
         * Send data to server.
         */
        sendData(invoke: Invoke): void;
    }
}
declare namespace samchon.protocol.service {
}
declare namespace samchon.protocol.slave {
    /**
     * @brief A slave system.
     *
     * @details
     * <p> SlaveSystem, literally, means a slave system belongs to a maste system. </p>
     *
     * <p> The SlaveSystem class is used in opposite side system of master::DistributedSystem
     * and master::ParallelSystem and reports elapsed time of each commmand (by Invoke message)
     * for estimation of its performance. </p>
     *
     * @inheritdoc
     * @author Jeongho Nam <http://samchon.org>
     */
    abstract class SlaveSystem extends ExternalSystem {
        /**
         * <p> Default Constructor. </p>
         */
        constructor();
        /**
         * @inheritdoc
         */
        replyData(invoke: Invoke): void;
    }
}
declare namespace samchon.library {
    /**
     * <p> Registers an event listener object with an EventDispatcher object so that the listener
     * receives notification of an event. You can register event listeners on all nodes in the display
     * list for a specific type of event, phase, and priority. </p>
     *
     * <p> After you successfully register an event listener, you cannot change its priority through
     * additional calls to addEventListener(). To change a listener's priority, you must first call
     * removeListener(). Then you can register the listener again with the new priority level. </p>
     *
     * Keep in mind that after the listener is registered, subsequent calls to <code>addEventListener()</code>
     * with a different type or useCapture value result in the creation of a separate listener registration.
     * For example, if you first register a listener with useCapture set to true, it listens only during the
     * capture phase. If you call addEventListener() again using the same listener object, but with
     * useCapture set to false, you have two separate listeners: one that listens during the capture
     * phase and another that listens during the target and bubbling phases.
     *
     * <p> You cannot register an event listener for only the target phase or the bubbling phase. Those
     * phases are coupled during registration because bubbling applies only to the ancestors of the
     * target node. </p>
     *
     * <p> If you no longer need an event listener, remove it by calling <code>removeEventListener()</code>,
     * or memory problems could result. Event listeners are not automatically removed from memory
     * because the garbage collector does not remove the listener as long as the dispatching object
     * exists (unless the useWeakReference parameter is set to true). </p>
     *
     * <p> Copying an EventDispatcher instance does not copy the event listeners attached to it. (If your
     * newly created node needs an event listener, you must attach the listener after creating the
     * node.) However, if you move an EventDispatcher instance, the event listeners attached to it move
     * along with it. </p>
     *
     * <p> If the event listener is being registered on a node while an event is being processed on
     * this node, the event listener is not triggered during the current phase but can be triggered
     * during a later phase in the event flow, such as the bubbling phase. </p>
     *
     * <p> If an event listener is removed from a node while an event is being processed on the node, it is
     * still triggered by the current actions. After it is removed, the event listener is never invoked
     * again (unless registered again for future processing). </p>
     *
     * <ul>
     *  <li> Made by AS3 - http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/EventDispatcher.html
     * </ul>
     *
     * @author Migrated by Jeongho Nam <http://samchon.org>
     */
    class EventDispatcher implements IEventDispatcher {
        /**
         * The origin object who issuing events.
         */
        protected target: IEventDispatcher;
        /**
         * Container of listeners.
         */
        protected listeners: std.HashMap<string, std.HashSet<std.Bind<EventListener, Object>>>;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from the origin event dispatcher.
         *
         * @param target The origin object who issuing events.
         */
        constructor(target: IEventDispatcher);
        /**
         * @inheritdoc
         */
        hasEventListener(type: string): boolean;
        /**
         * @inheritdoc
         */
        dispatchEvent(event: Event): boolean;
        /**
         * @inheritdoc
         */
        addEventListener(type: string, listener: EventListener, thisArg?: Object): void;
        /**
         * @inheritdoc
         */
        removeEventListener(type: string, listener: EventListener, thisArg?: Object): void;
    }
}
declare namespace samchon.library {
    /**
     * <p> The IEventDispatcher interface defines methods for adding or removing event listeners, checks
     * whether specific types of event listeners are registered, and dispatches events. </p>
     *
     * <p> Event targets are an important part of the Flash® Player and Adobe AIR event model. The event
     * target serves as the focal point for how events flow through the display list hierarchy. When an
     * event such as a mouse click or a keypress occurs, an event object is dispatched into the event flow
     * from the root of the display list. The event object makes a round-trip journey to the event target,
     * which is conceptually divided into three phases: the capture phase includes the journey from the
     * root to the last node before the event target's node; the target phase includes only the event
     * target node; and the bubbling phase includes any subsequent nodes encountered on the return trip to
     * the root of the display list. </p>
     *
     * <p> In general, the easiest way for a user-defined class to gain event dispatching capabilities is
     * to extend EventDispatcher. If this is impossible (that is, if the class is already extending another
     * class), you can instead implement the IEventDispatcher interface, create an EventDispatcher member,
     * and write simple hooks to route calls into the aggregated EventDispatcher. </p>
     *
     * <ul>
     *  <li> Made by AS3 - http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/events/IEventDispatcher.html
     * </ul>
     *
     * @see EventDispatcher
     * @author Migrated by Jeongho Nam <http://samchon.org>
     */
    interface IEventDispatcher {
        /**
         * <p> Checks whether the EventDispatcher object has any listeners registered for a specific type
         * of event. This allows you to determine where an EventDispatcher object has altered handling of
         * an event type in the event flow hierarchy. To determine whether a specific event type actually
         * triggers an event listener, use willTrigger(). </p>
         *
         * <p> The difference between hasEventListener() and willTrigger() is that hasEventListener()
         * examines only the object to which it belongs, whereas willTrigger() examines the entire event
         * flow for the event specified by the type parameter. </p>
         *
         * @param type The type of event.
         */
        hasEventListener(type: string): boolean;
        /**
         * <p> Dispatches an event into the event flow. </p>
         * <p> The event target is the EventDispatcher object upon which the dispatchEvent() method is called. </p>
         *
         * @param event The Event object that is dispatched into the event flow. If the event is being
         *			  redispatched, a clone of the event is created automatically. After an event is
         *			  dispatched, its target property cannot be changed, so you must create a new copy
         *			  of the event for redispatching to work.
         */
        dispatchEvent(event: Event): boolean;
        /**
         * <p> Registers an event listener object with an EventDispatcher object so that the listener
         * receives notification of an event. You can register event listeners on all nodes in the display
         * list for a specific type of event, phase, and priority.
         *
         * <p> After you successfully register an event listener, you cannot change its priority through
         * additional calls to addEventListener(). To change a listener's priority, you must first call
         * removeEventListener(). Then you can register the listener again with the new priority level. </p>
         *
         * <p> Keep in mind that after the listener is registered, subsequent calls to addEventListener()
         * with a different type or useCapture value result in the creation of a separate listener
         * registration. For example, if you first register a listener with useCapture set to true,
         * it listens only during the capture phase. If you call addEventListener() again using the same
         * listener object, but with useCapture set to false, you have two separate listeners: one that
         * listens during the capture phase and another that listens during the target and bubbling phases. </p>
         *
         * <p> You cannot register an event listener for only the target phase or the bubbling phase.
         * Those phases are coupled during registration because bubbling applies only to the ancestors of
         * the target node. </p>
         *
         * <p> If you no longer need an event listener, remove it by calling removeEventListener(), or
         * memory problems could result. Event listeners are not automatically removed from memory because
         * the garbage collector does not remove the listener as long as the dispatching object exists
         * (unless the useWeakReference parameter is set to true). </p>
         *
         * <p> Copying an EventDispatcher instance does not copy the event listeners attached to it. (If
         * your newly created node needs an event listener, you must attach the listener after creating
         * the node.) However, if you move an EventDispatcher instance, the event listeners attached to
         * it move along with it. </p>
         *
         * <p> If the event listener is being registered on a node while an event is also being processed
         * on this node, the event listener is not triggered during the current phase but may be triggered
         * during a later phase in the event flow, such as the bubbling phase. </p>
         *
         * <p> If an event listener is removed from a node while an event is being processed on the node,
         * it is still triggered by the current actions. After it is removed, the event listener is never
         * invoked again (unless it is registered again for future processing). </p>
         *
         * @param event The type of event.
         * @param listener The listener function that processes the event.
         *				 This function must accept an Event object as its only parameter and must return
         *				 nothing.
         */
        addEventListener(type: string, listener: EventListener, thisArg: Object): void;
        /**
         * Removes a listener from the EventDispatcher object. If there is no matching listener registered
         * with the EventDispatcher object, a call to this method has no effect.
         *
         * @param type The type of event.
         * @param listener The listener object to remove.
         */
        removeEventListener(type: string, listener: EventListener, thisArg: Object): void;
    }
}
declare namespace samchon.library {
    /**
     * <p> A utility class supporting static methods of string. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class StringUtil {
        /**
         * <p> Get a tabbed string by specified size. </p>
         */
        static tab(size: number): string;
        /**
         * <p> Get a tabbed HTLM string by specified size. </p>
         */
        static htmlTab(size: number): string;
        /**
         * <p> Replace all patterns of a string. </p>
         */
        static replaceAll(str: string, pairs: Array<std.Pair<string, string>>): string;
    }
}
declare namespace samchon.library {
    /**
     * <p> List of XML(s) having same tag. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class XMLList extends std.Vector<XML> {
        /**
         * <p> Default Constructor. </p>
         */
        constructor();
        getTag(): string;
        /**
         * <p> Convert XMLList to string. </p>
         *
         * @param level Level(depth) of the XMLList.
         */
        toString(level?: number): string;
        /**
         * <p> Convert XMLList to HTML string. </p>
         *
         * @param level Level(depth) of the XMLList.
         */
        toHTML(level?: number): string;
    }
}
declare namespace samchon.library {
    /**
     * <p> XML is a class representing a tree structued xml objects. </p>
     * <p> The XML class provides methods and properties for working with XML objects. </p>
     *
     * <p> The XML class (along with the XMLList and Namespace) implements
     * the powerful XML-handling standard defined in ECMAScript for XML (E4X) specification. </p>
     *
     * <p> XML class has a recursive, hierarchical relationship. </p>
     *
     * <p> Relationships between XML and XMLList </p>
     * <ul>
     *	<li> XML contains XMLList from dictionary of XMLList. </li>
     *  <li> XMLList contains XML from vector of XML. </li>
     * </ul>
     *
     * <h4> Note </h4>
     * <p> Do not abuse values for expressing member variables. </p>
     *
     * <table>
     *	<tr>
     *		<th>Standard Usage</th>
     *		<th>Non-standard usage abusing value</th>
     *	</tr>
     *	<tr>
     *		<td>
     *			&lt;memberList&gt;<br/>
     *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;member id='jhnam88' name='Jeongho+Nam' birthdate='1988-03-11' /&gt;<br/>
     *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;member id='master' name='Administartor' birthdate='2011-07-28' /&gt;<br/>
     *			&lt;/memberList&gt;
     *		</td>
     *		<td>
     *			&lt;member&gt;<br/>
     *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;id&gt;jhnam88&lt;/id&gt;<br/>
     *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;name&gt;Jeongho+Nam&lt;/name&gt;<br/>
     *			&nbsp;&nbsp;&nbsp;&nbsp; &lt;birthdate&gt;1988-03-11&lt;/birthdate&gt;<br/>
     *			&lt;/member&gt;
     *		</td>
     *	</tr>
     * </table>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class XML extends std.HashMap<string, XMLList> {
        /**
         * <p> Tag name of the XML. </p>
         *
         * <ul>
         *	<li> \<<b>tag</b> label='property' /\>: tag => \"tag\" </li>
         *  <li> \<<b>price</b> high='1500' low='1300' open='1450' close='1320' /\>: tag => \"price\" </li>
         * </ul>
         */
        private tag;
        /**
         * <p> Value of the XML. </p>
         *
         * <ul>
         *  <li> \<parameter name='age' type='int'\><b>26</b>\</parameter\>: value => 26 </li>
         *	<li> \<price high='1500' low='1300' open='1450' close='1320' /\>: value => null </li>
         * </ul>
         */
        private value;
        /**
         * <p> Properties belongs to the XML. </p>
         * <p> A Dictionary of properties accessing each property by its key. </p>
         *
         * <ul>
         *	<li> \<price <b>high='1500' low='1300' open='1450' close='1320'</b> /\>:
         *		propertyMap => {{\"high\": 1500}, {\"low\": 1300}, {\"open\": 1450}, {\"close\", 1320}} </li>
         *	<li> \<member <b>id='jhnam88' name='Jeongho+Nam' comment='Hello.+My+name+is+Jeongho+Nam'</b> \>:
         *		propertyMap => {{\"id\", \"jhnam88\"}, {\"name\", \"Jeongho Nam <http://samchon.org>\"},
         *					 {\"comment\", \"Hello. My name is Jeongho Nam <http://samchon.org>\"}} </li>
         * </ul>
         */
        private properties;
        /**
         * <p> Default Constructor. </p>
         *
         * <p> If the string parameter is not omitted, constructs its tag, value and
         * properties by parsing the string. If there's children, then construct the
         * children XML, XMLList objects, too. </p>
         *
         * @param str A string to be parsed
         */
        constructor(str?: string);
        /**
         * <p> Construct XML objects by parsing a string. </p>
         */
        private construct(str);
        /**
         * <p> Parse and fetch a tag. </p>
         */
        private parseTag(str);
        /**
         * <p> Parse and fetch properties. </p>
         */
        private parseProperty(str);
        /**
         * <p> Parse and fetch a value. </p>
         */
        private parseValue(str);
        /**
         * <p> Parse and construct children XML objects. </p>
         */
        private parseChildren(str);
        /**
         * <p> Get tag. </p>
         */
        getTag(): string;
        /**
         * <p> Get value. </p>
         */
        getValue(): any;
        /**
         * <p> Test wheter a property exists or not. </p>
         */
        hasProperty(key: string): boolean;
        /**
         * <p> Get property by its key. </p>
         */
        getProperty(key: string): any;
        getPropertyMap(): std.HashMap<string, any>;
        /**
         * <p> Set tag (identifier) of the XML. </p>
         */
        setTag(str: string): void;
        /**
         * <p> Set value of the XML. </p>
         *
         * <p> Do not abuse values for expressing member variables. </p>
         * <table>
         *	<tr>
         *		<th>Standard Usage</th>
         *		<th>Non-standard usage abusing value</th>
         *	</tr>
         *	<tr>
         *		<td>
         *			\<memberList\>\n
         *			&nbsp;&nbsp;&nbsp;&nbsp;\<member id='jhnam88' name='Jeongho+Nam' birthdate='1988-03-11' /\>\n
         *			&nbsp;&nbsp;&nbsp;&nbsp;\<member id='master' name='Administartor' birthdate='2011-07-28' /\>\n
         *			\</memberList\>
         *		</td>
         *		<td>
         *			\<member\>\n
         *				\<id\>jhnam88\</id\>\n
         *				\<name\>Jeongho+Nam\</name\>\n
         *				\<birthdate\>1988-03-11\</birthdate\>\n
         *			\</member\>
         *		</td>
         *	</tr>
         * </table>
         *
         * @param val A value to set
         */
        setValue(str: any): void;
        /**
         * <p> Set a property with its key. </p>
         */
        setProperty(key: string, value: any): void;
        /**
         * <p> Erase a property by its key. </p>
         *
         * @param key The key of the property to erase
         * @throw exception out of range
         */
        eraseProperty(key: string): void;
        push(...xmls: XML[]): number;
        push(...xmlLists: XMLList[]): number;
        addAllProperties(xml: XML): void;
        clearProperties(): void;
        private calcMinIndex(...args);
        /**
         * <p> Decode a value. </p>
         *
         * <table>
         *	<tr>
         *		<th>Encoded</th>
         *		<th>Decoded</th>
         *	</tr>
         *	<tr>
         *		<td>\&amp;</td>
         *		<td>\&</td>
         *	</tr>
         *	<tr>
         *		<td>\&lt;</td>
         *		<td>\<</td>
         *	</tr>
         *	<tr>
         *		<td>\&gt;</td>
         *		<td>\></td>
         *	</tr>
         * </table>
         *
         * @return A decoded string represents a value
         */
        static decodeValue(str: string): string;
        /**
         * <p> Encode a value. </p>
         *
         * <table>
         *	<tr>
         *		<th>Original</th>
         *		<th>Encoded</th>
         *	</tr>
         *	<tr>
         *		<td>\&</td>
         *		<td>\&amp;</td>
         *	</tr>
         *	<tr>
         *		<td>\<</td>
         *		<td>\&lt;</td>
         *	</tr>
         *	<tr>
         *		<td>\></td>
         *		<td>\&gt;</td>
         *	</tr>
         * </table>
         *
         * @return A encoded string represents a value
         */
        static encodeValue(str: string): string;
        /**
          * <p> Decode a property. </p>
          *
          * <table>
          *	<tr>
          *		<th>Encoded</th>
          *		<th>Decoded</th>
          *	</tr>
          *	<tr>
          *		<td>\&amp;</td>
          *		<td>\&</td>
          *	</tr>
          *	<tr>
          *		<td>\&lt;</td>
          *		<td>\<</td>
          *	</tr>
          *	<tr>
          *		<td>\&gt;</td>
          *		<td>\></td>
          *	</tr>
          *	<tr>
          *		<td>&quot;</td>
          *		<td>\"</td>
          *	</tr>
          *	<tr>
          *		<td>&apos;</td>
          *		<td>'</td>
          *	</tr>
          *	<tr>
          *		<td>&#x9;</td>
          *		<td>'</td>
          *	</tr>
          *	<tr>
          *		<td>&apos;</td>
          *		<td>\\t</td>
          *	</tr>
          *	<tr>
          *		<td>&#xA;</td>
          *		<td>\\n</td>
          *	</tr>
          *	<tr>
          *		<td>&#xD;</td>
          *		<td>\\r</td>
          *	</tr>
          * </table>
          *
          * @return A decoded string represents a property
          */
        static decodeProperty(str: string): string;
        /**
         * <p> Decode a property. </p>
         *
         * <table>
         *	<tr>
         *		<th>Original</th>
         *		<th>Encoded</th>
         *	</tr>
         *	<tr>
         *		<td>\&</td>
         *		<td>\&amp;</td>
         *	</tr>
         *	<tr>
         *		<td>\<</td>
         *		<td>\&lt;</td>
         *	</tr>
         *	<tr>
         *		<td>\></td>
         *		<td>\&gt;</td>
         *	</tr>
         *	<tr>
         *		<td>\"</td>
         *		<td>&quot;</td>
         *	</tr>
         *	<tr>
         *		<td>'</td>
         *		<td>&apos;</td>
         *	</tr>
         *	<tr>
         *		<td>'</td>
         *		<td>&#x9;</td>
         *	</tr>
         *	<tr>
         *		<td>\\t</td>
         *		<td>&apos;</td>
         *	</tr>
         *	<tr>
         *		<td>\\n</td>
         *		<td>&#xA;</td>
         *	</tr>
         *	<tr>
         *		<td>\\r</td>
         *		<td>&#xD;</td>
         *	</tr>
         * </table>
         *
         * @return A encoded string represents a property
         */
        static encodeProperty(str: string): string;
        /**
         * <p> Convert the XML to a string. </p>
         */
        toString(level?: number): string;
        /**
         * <p> Convert the XML to HTML string. </p>
         */
        toHTML(level?: number): string;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> An interface of entity. </p>
     *
     * <p> Entity is a class for standardization of expression method using on network I/O by XML. If
     * Invoke is a standard message protocol of Samchon Framework which must be kept, Entity is a
     * recommended semi-protocol of message for expressing a data class. Following the semi-protocol
     * Entity is not imposed but encouraged. </p>
     *
     * <p> As we could get advantages from standardization of message for network I/O with Invoke,
     * we can get additional advantage from standardizing expression method of data class with Entity.
     * We do not need to know a part of network communication. Thus, with the Entity, we can only
     * concentrate on entity's own logics and relationships between another entities. Entity does not
     * need to how network communications are being done. </p>
     *
     * <p> I say repeatedly. Expression method of Entity is recommended, but not imposed. It's a semi
     * protocol for network I/O but not a essential protocol must be kept. The expression method of
     * Entity, using on network I/O, is expressed by XML string. </p>
     *
     * <p> If your own network system has a critical performance issue on communication data class,
     * it would be better to using binary communication (with ByteArray).
     * Don't worry about the problem! Invoke also provides methods for binary data (ByteArray). </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    interface IEntity {
        /**
         * <p> Construct data of the Entity from a XML object. </p>
         *
         * <p> Overrides the construct() method and fetch data of member variables from the XML. </p>
         *
         * <p> By recommended guidance, data representing member variables are contained in properties
         * of the put XML object. </p>
         *
         * @param xml An xml used to contruct data of entity.
         */
        construct(xml: library.XML): any;
        /**
        * <p> Get a key that can identify the Entity uniquely. </p>
        *
        * <p> If identifier of the Entity is not atomic value, returns a string or paired object
        * that can represents the composite identifier. </p>
        */
        key(): any;
        /**
         * <p> A tag name when represented by XML. </p>
         *
         * <ul>
         * 	<li> &lt;TAG {...properties} /&gt; </li>
         * </ul>
         */
        TAG(): string;
        /**
         * <p> Get a XML object represents the Entity. </p>
         *
         * <p> A member variable (not object, but atomic value like number, string or date) is categorized
         * as a property within the framework of entity side. Thus, when overriding a toXML() method and
         * archiving member variables to an XML object to return, puts each variable to be a property
         * belongs to only a XML object. </p>
         *
         * <p> Don't archive the member variable of atomic value to XML::value causing enormouse creation
         * of XML objects to number of member variables. An Entity must be represented by only a XML
         * instance (tag). </p>
         *
         * <table>
         *	<tr>
         *		<th> Standard Usage </th>
         *		<th> Non-standard usage abusing value </th>
         *	</tr>
         *	<tr>
         *		<td>
         *		  &lt;memberList&gt; <br>
         *		  &lt;member id='jhnam88' name='Jeongho+Nam' birthdate='1988-03-11' /&gt; <br>
    &lt;member id='master' name='Administartor' birthdate='2011-07-28' /&gt; <br>
&lt;/memberList&gt;
         *		</td>
         *		<td>
         *		  &lt;member&gt;
         *		  &lt;id&gt;jhnam88&lt;/id&gt;
         *		  &lt;name&gt;Jeongho+Nam&lt;name&gt;
         *		  &lt;birthdate&gt;1988-03-11&lt;/birthdate&gt;
         *		  &lt;/member&gt;
         *		</td>
         *	</tr>
         * </table>
         *
         * @return An XML object representing the Entity.
         */
        toXML(): library.XML;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> Standard message of network I/O. </p>
     * <p> Invoke is a class used in network I/O in protocol package of Samchon Framework. </p>
     *
     * <p> The Invoke message has an XML structure like the result screen of provided example in below.
     * We can enjoy lots of benefits by the normalized and standardized message structure used in
     * network I/O. </p>
     *
     * <p> The greatest advantage is that we can make any type of network system, even how the system
     * is enourmously complicated. As network communication message is standardized, we only need to
     * concentrate on logical relationships between network systems. We can handle each network system
     * like a object (class) in OOD. And those relationships can be easily designed by using design
     * pattern. </p>
     *
     * <p> In Samchon Framework, you can make any type of network system with basic 3 + 1 componenets
     * (IProtocol, IServer and IClient + ServerConnector), by implemens or inherits them, like designing
     * classes of S/W architecture. </p>
     *
     * @see IProtocol
     * @author Jeongho Nam <http://samchon.org>
     */
    class Invoke extends EntityArray<InvokeParameter> {
        /**
         * <p> Listener, represent function's name. </p>
         */
        protected listener: string;
        constructor(listener: string);
        /**
         * Copy Constructor.
         *
         * @param invoke
         */
        constructor(invoke: Invoke);
        constructor(xml: library.XML);
        constructor(listener: string, begin: std.VectorIterator<InvokeParameter>, end: std.VectorIterator<InvokeParameter>);
        constructor(listener: string, ...parameters: any[]);
        /**
         * @inheritdoc
         */
        protected createChild(xml: library.XML): InvokeParameter;
        /**
         * Get listener.
         */
        getListener(): string;
        /**
         * <p> Get arguments for Function.apply(). </p>
         *
         * @return An array containing values of the contained parameters.
         */
        getArguments(): Array<any>;
        /**
         * <p> Apply to a matched function. </p>
         */
        apply(obj: IProtocol): boolean;
        /**
         * @inheritdoc
         */
        TAG(): string;
        /**
         * @inheritdoc
         */
        CHILD_TAG(): string;
    }
}
declare namespace samchon.protocol {
    /**
     * A parameter belongs to an Invoke.
     *
     * @see Invoke
     * @author Jeongho Nam <http://samchon.org>
     */
    class InvokeParameter extends Entity {
        /**
         * <p> Name of the parameter. </p>
         *
         * @details Optional property, can be omitted.
         */
        protected name: string;
        /**
         * <p> Type of the parameter. </p>
         */
        protected type: string;
        /**
         * <p> Value of the parameter. </p>
         */
        protected value: any;
        constructor();
        constructor(name: string, val: any);
        constructor(name: string, type: string, val: any);
        construct(xml: library.XML): void;
        key(): any;
        /**
         * Get name.
         */
        getName(): string;
        /**
         * Get type.
         */
        getType(): string;
        /**
         * Get value.
         */
        getValue(): any;
        TAG(): string;
        toXML(): library.XML;
    }
}
declare namespace samchon.protocol {
    /**
     * <p> An interface for Invoke message chain. </p>
     *
     * <p> IProtocol is an interface for Invoke message, which is standard message of network I/O
     * in Samchon Framework, chain. The IProtocol interface is used to network drivers and some
     * classes which are in a relationship of chain of responsibility with those network drivers. </p>
     *
     * <p> In Samchon Framework, server side, IProtocol is one of the basic 3 + 1 components that
     * can make any type of network system in Samchon Framework with IServer and IClient. Following
     * the "chain of responsibility" pa1ttern, looking around classes in Samchon Framework, you
     * can see all related classes with network I/O are implemented from the IProtocol. </p>
     *
     * @see Invoke
     * @author Jeongho Nam <http://samchon.org>
     */
    interface IProtocol {
        /**
         * <p> Sending message. </p>
         * <p> Sends message to related system or shifts the responsibility to chain. </p>
         *
         * @param invoke Invoke message to send
         */
        replyData(invoke: Invoke): void;
        /**
         * <p> Handling replied message. </p>
         * <p> Handles replied message or shifts the responsibility to chain. </p>
         *
         * @param invoke Replied invoke message
         */
        sendData(invoke: Invoke): void;
    }
}